import uuid
from datetime import datetime

from pydantic import BaseModel


class NotebookCreate(BaseModel):
    title: str
    description: str | None = None
    parent_id: uuid.UUID | None = None


class NotebookUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    parent_id: uuid.UUID | None = None


class NotebookResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None
    parent_id: uuid.UUID | None
    position: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
