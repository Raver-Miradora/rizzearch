import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError, ForbiddenError
from app.models.tag import Tag
from app.schemas.tag import TagCreate, TagUpdate


async def create_tag(db: AsyncSession, user_id: uuid.UUID, data: TagCreate) -> Tag:
    tag = Tag(user_id=user_id, name=data.name, color=data.color)
    db.add(tag)
    await db.commit()
    await db.refresh(tag)
    return tag


async def get_tags(db: AsyncSession, user_id: uuid.UUID) -> list[Tag]:
    result = await db.execute(
        select(Tag).where(Tag.user_id == user_id).order_by(Tag.name)
    )
    return list(result.scalars().all())


async def get_tag_by_id(
    db: AsyncSession, tag_id: uuid.UUID, user_id: uuid.UUID
) -> Tag:
    result = await db.execute(select(Tag).where(Tag.id == tag_id))
    tag = result.scalar_one_or_none()
    if not tag:
        raise NotFoundError("Tag not found")
    if tag.user_id != user_id:
        raise ForbiddenError("Not your tag")
    return tag


async def update_tag(
    db: AsyncSession, tag_id: uuid.UUID, user_id: uuid.UUID, data: TagUpdate
) -> Tag:
    tag = await get_tag_by_id(db, tag_id, user_id)
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(tag, field, value)
    await db.commit()
    await db.refresh(tag)
    return tag


async def delete_tag(
    db: AsyncSession, tag_id: uuid.UUID, user_id: uuid.UUID
) -> None:
    tag = await get_tag_by_id(db, tag_id, user_id)
    await db.delete(tag)
    await db.commit()
