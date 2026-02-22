import uuid
from datetime import datetime

from pydantic import BaseModel


class NoteCreate(BaseModel):
    title: str = "Untitled"
    content: str = ""
    notebook_id: uuid.UUID | None = None


class NoteUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    notebook_id: uuid.UUID | None = None


class NoteResponse(BaseModel):
    id: uuid.UUID
    title: str
    content: str
    summary: str | None
    is_favorited: bool
    is_pinned: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
