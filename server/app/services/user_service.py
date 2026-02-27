import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.core.exceptions import NotFoundError


async def get_user_by_id(db: AsyncSession, user_id: uuid.UUID) -> User:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise NotFoundError("User not found")
    return user


async def update_user(
    db: AsyncSession, user_id: uuid.UUID, **updates: object
) -> User:
    """Apply arbitrary attribute updates to a user and return the refreshed model."""
    user = await get_user_by_id(db, user_id)
    for field, value in updates.items():
        setattr(user, field, value)
    await db.commit()
    await db.refresh(user)
    return user


async def update_avatar(db: AsyncSession, user_id: uuid.UUID, url: str) -> User:
    """Set the user's avatar URL."""
    return await update_user(db, user_id, avatar_url=url)
