from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.db import crud
from backend.db.database import get_db
from backend.db.models import User
from backend.routers.deps import get_current_user

router = APIRouter(prefix="/profile", tags=["profile"])


class ProfileResponse(BaseModel):
    email: str
    name: str | None
    age: int | None
    subscription: str
    messages_today: int
    onboarding_done: bool


class OnboardingRequest(BaseModel):
    name: str
    age: int | None = None


@router.get("/me", response_model=ProfileResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    return ProfileResponse(
        email=current_user.email,
        name=current_user.name,
        age=current_user.age,
        subscription=current_user.subscription,
        messages_today=current_user.messages_today,
        onboarding_done=current_user.onboarding_done,
    )


@router.post("/onboarding")
async def complete_onboarding(
    data: OnboardingRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    await crud.update_user(
        db, current_user,
        name=data.name,
        age=data.age,
        onboarding_done=True,
    )
    return {"ok": True}
