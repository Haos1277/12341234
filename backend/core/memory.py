from typing import List

import anthropic

from backend.config import settings

client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)

SUMMARY_PROMPT = """На основе переписки пользователя с психологом-ассистентом составь краткое резюме о пользователе.
Включи: имя, возраст (если известны), основные темы/проблемы, прогресс, важные детали жизни.
Резюме должно быть кратким (3-5 предложений) и написано от третьего лица.
Сохрани предыдущее резюме, если оно есть, дополнив новой информацией.

Предыдущее резюме:
{previous_summary}

Последние сообщения:
{messages}

Новое резюме:"""


async def maybe_update_summary(
    user_messages_count: int,
    recent_messages: List[dict],
    previous_summary: str | None,
) -> str | None:
    """Generate new summary every 10 messages."""
    if user_messages_count % 10 != 0 or user_messages_count == 0:
        return None

    messages_text = "\n".join(
        f"{'Пользователь' if m['role'] == 'user' else 'Психолог'}: {m['content']}"
        for m in recent_messages[-20:]
    )

    response = await client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=500,
        messages=[{
            "role": "user",
            "content": SUMMARY_PROMPT.format(
                previous_summary=previous_summary or "Нет",
                messages=messages_text,
            )
        }]
    )
    return response.content[0].text
