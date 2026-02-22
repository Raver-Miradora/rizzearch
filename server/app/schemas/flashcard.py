import uuid
from datetime import datetime, date

from pydantic import BaseModel


class FlashcardDeckCreate(BaseModel):
    title: str
    description: str | None = None
    note_id: uuid.UUID | None = None


class FlashcardCreate(BaseModel):
    front: str
    back: str
    difficulty: str = "medium"


class FlashcardResponse(BaseModel):
    id: uuid.UUID
    front: str
    back: str
    difficulty: str
    next_review: date
    created_at: datetime

    model_config = {"from_attributes": True}


class DeckResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None
    card_count: int
    created_at: datetime

    model_config = {"from_attributes": True}
