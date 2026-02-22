import uuid

from fastapi import APIRouter, Query

from app.api.deps import DBSession, CurrentUser
from app.schemas.note import NoteCreate, NoteUpdate, NoteResponse
from app.services import note_service

router = APIRouter()


@router.get("/", response_model=list[NoteResponse])
async def list_notes(
    db: DBSession,
    current_user: CurrentUser,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
):
    """List the current user's notes."""
    notes = await note_service.get_notes(db, current_user.id, skip, limit)
    return [NoteResponse.model_validate(n) for n in notes]


@router.post("/", response_model=NoteResponse, status_code=201)
async def create_note(
    data: NoteCreate,
    db: DBSession,
    current_user: CurrentUser,
):
    """Create a new note."""
    note = await note_service.create_note(db, current_user.id, data)
    return NoteResponse.model_validate(note)


@router.get("/{note_id}", response_model=NoteResponse)
async def get_note(note_id: uuid.UUID, db: DBSession, current_user: CurrentUser):
    """Get a single note by ID."""
    note = await note_service.get_note_by_id(db, note_id, current_user.id)
    return NoteResponse.model_validate(note)


@router.put("/{note_id}", response_model=NoteResponse)
async def update_note(
    note_id: uuid.UUID,
    data: NoteUpdate,
    db: DBSession,
    current_user: CurrentUser,
):
    """Update a note."""
    note = await note_service.update_note(db, note_id, current_user.id, data)
    return NoteResponse.model_validate(note)


@router.delete("/{note_id}", status_code=204)
async def delete_note(note_id: uuid.UUID, db: DBSession, current_user: CurrentUser):
    """Delete a note."""
    await note_service.delete_note(db, note_id, current_user.id)


@router.post("/{note_id}/favorite", response_model=NoteResponse)
async def toggle_favorite(note_id: uuid.UUID, db: DBSession, current_user: CurrentUser):
    """Toggle note favorite."""
    note = await note_service.toggle_favorite(db, note_id, current_user.id)
    return NoteResponse.model_validate(note)


@router.post("/{note_id}/pin", response_model=NoteResponse)
async def toggle_pin(note_id: uuid.UUID, db: DBSession, current_user: CurrentUser):
    """Toggle note pin."""
    note = await note_service.toggle_pin(db, note_id, current_user.id)
    return NoteResponse.model_validate(note)
