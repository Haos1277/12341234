import json
from typing import AsyncIterator

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.config import settings
from backend.core.claude import stream_response
from backend.core.knowledge import search_knowledge
from backend.core.memory import maybe_update_summary
from backend.db import crud
from backend.db.database import get_db
from backend.db.models import User
from backend.routers.deps import get_current_user

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str


class HistoryMessage(BaseModel):
    role: str
    content: str
    created_at: str


@router.get("/history")
async def get_history(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    messages = await crud.get_recent_messages(db, current_user.id, limit=50)
    return [
        HistoryMessage(
            role=m.role,
            content=m.content,
            created_at=m.created_at.isoformat(),
        )
        for m in messages
    ]


@router.post("/send")
async def send_message(
    data: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Check daily limit
    allowed = await crud.check_and_increment_message_count(
        db, current_user, settings.free_messages_per_day
    )
    if not allowed:
        raise HTTPException(
            status_code=402,
            detail="Достигнут дневной лимит сообщений. Оформите подписку для безлимитного доступа.",
        )

    # Save user message
    await crud.save_message(db, current_user.id, "user", data.message)

    # Build context
    recent = await crud.get_recent_messages(db, current_user.id, limit=20)
    messages_for_claude = [{"role": m.role, "content": m.content} for m in recent]

    # RAG knowledge search
    knowledge_context = await search_knowledge(data.message)

    # Stream response and collect full text
    async def generate() -> AsyncIterator[str]:
        full_response = []

        async for chunk in stream_response(
            messages=messages_for_claude,
            profile_summary=current_user.profile_summary,
            knowledge_context=knowledge_context,
        ):
            full_response.append(chunk)
            yield f"data: {json.dumps({'text': chunk})}\n\n"

        # Save assistant message
        assistant_text = "".join(full_response)
        await crud.save_message(db, current_user.id, "assistant", assistant_text)

        # Maybe update long-term memory
        total = await crud.count_user_messages(db, current_user.id)
        new_summary = await maybe_update_summary(
            user_messages_count=total,
            recent_messages=messages_for_claude,
            previous_summary=current_user.profile_summary,
        )
        if new_summary:
            await crud.update_user(db, current_user, profile_summary=new_summary)

        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
