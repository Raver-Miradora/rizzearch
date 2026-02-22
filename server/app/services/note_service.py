import uuid

from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.exceptions import NotFoundError, ForbiddenError
from app.models.note import Note
from app.schemas.note import NoteCreate, NoteUpdate


async def create_note(db: AsyncSession, user_id: uuid.UUID, data: NoteCreate) -> Note:
    """Create a new note for the given user."""
    note = Note(
        user_id=user_id,
        title=data.title,
        content=data.content,
        content_plain=data.content,  # strip html later
        notebook_id=data.notebook_id,
    )
    db.add(note)
    await db.commit()
    await db.refresh(note)
    return note


async def get_notes(
    db: AsyncSession,
    user_id: uuid.UUID,
    skip: int = 0,
    limit: int = 50,
) -> list[Note]:
    """Return all notes for a user, newest first."""
    result = await db.execute(
        select(Note)
        .where(Note.user_id == user_id)
        .order_by(desc(Note.is_pinned), desc(Note.updated_at))
        .offset(skip)
        .limit(limit)
    )
    return list(result.scalars().all())


async def get_note_by_id(db: AsyncSession, note_id: uuid.UUID, user_id: uuid.UUID) -> Note:
    """Fetch a single note, ensuring it belongs to the user."""
    result = await db.execute(
        select(Note).where(Note.id == note_id)
    )
    note = result.scalar_one_or_none()
    if not note:
        raise NotFoundError("Note not found")
    if note.user_id != user_id:
        raise ForbiddenError("Not your note")
    return note


async def update_note(
    db: AsyncSession, note_id: uuid.UUID, user_id: uuid.UUID, data: NoteUpdate
) -> Note:
    """Update a note's fields."""
    note = await get_note_by_id(db, note_id, user_id)

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(note, field, value)

    if "content" in update_data:
        note.content_plain = update_data["content"]  # strip html later

    await db.commit()
    await db.refresh(note)
    return note


async def delete_note(db: AsyncSession, note_id: uuid.UUID, user_id: uuid.UUID) -> None:
    """Delete a note."""
    note = await get_note_by_id(db, note_id, user_id)
    await db.delete(note)
    await db.commit()


async def toggle_favorite(db: AsyncSession, note_id: uuid.UUID, user_id: uuid.UUID) -> Note:
    """Toggle the is_favorited flag."""
    note = await get_note_by_id(db, note_id, user_id)
    note.is_favorited = not note.is_favorited
    await db.commit()
    await db.refresh(note)
    return note


async def toggle_pin(db: AsyncSession, note_id: uuid.UUID, user_id: uuid.UUID) -> Note:
    """Toggle the is_pinned flag."""
    note = await get_note_by_id(db, note_id, user_id)
    note.is_pinned = not note.is_pinned
    await db.commit()
    await db.refresh(note)
    return note