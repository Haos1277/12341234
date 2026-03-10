from datetime import date, datetime
from typing import List, Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.db.models import Message, User


# --- Users ---

async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: UUID) -> Optional[User]:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def create_user(db: AsyncSession, email: str, password_hash: str) -> User:
    user = User(email=email, password_hash=password_hash)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def update_user(db: AsyncSession, user: User, **kwargs) -> User:
    for key, value in kwargs.items():
        setattr(user, key, value)
    await db.commit()
    await db.refresh(user)
    return user


async def check_and_increment_message_count(db: AsyncSession, user: User, limit: int) -> bool:
    """Returns True if user can send message, False if limit reached."""
    today = date.today().isoformat()
    if user.messages_today_date != today:
        user.messages_today = 0
        user.messages_today_date = today
    if user.subscription != "paid" and user.messages_today >= limit:
        await db.commit()
        return False
    user.messages_today += 1
    await db.commit()
    return True


# --- Messages ---

async def save_message(db: AsyncSession, user_id: UUID, role: str, content: str) -> Message:
    msg = Message(user_id=user_id, role=role, content=content)
    db.add(msg)
    await db.commit()
    await db.refresh(msg)
    return msg


async def get_recent_messages(db: AsyncSession, user_id: UUID, limit: int = 20) -> List[Message]:
    result = await db.execute(
        select(Message)
        .where(Message.user_id == user_id)
        .order_by(Message.created_at.desc())
        .limit(limit)
    )
    messages = result.scalars().all()
    return list(reversed(messages))


async def count_user_messages(db: AsyncSession, user_id: UUID) -> int:
    result = await db.execute(select(Message).where(Message.user_id == user_id))
    return len(result.scalars().all())
