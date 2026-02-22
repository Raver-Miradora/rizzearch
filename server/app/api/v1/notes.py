from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_notes():
    """List user's notes (paginated, filterable)."""
    return {"message": "TODO: implement list notes"}


@router.post("/")
async def create_note():
    """Create a new note."""
    return {"message": "TODO: implement create note"}


@router.get("/{note_id}")
async def get_note(note_id: str):
    """Get a single note by ID."""
    return {"message": f"TODO: implement get note {note_id}"}


@router.put("/{note_id}")
async def update_note(note_id: str):
    """Update a note."""
    return {"message": f"TODO: implement update note {note_id}"}


@router.delete("/{note_id}")
async def delete_note(note_id: str):
    """Delete a note."""
    return {"message": f"TODO: implement delete note {note_id}"}
