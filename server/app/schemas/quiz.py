import uuid
from datetime import datetime

from pydantic import BaseModel


class QuizResponse(BaseModel):
    id: uuid.UUID
    title: str
    question_count: int
    created_at: datetime

    model_config = {"from_attributes": True}


class QuizAttemptResponse(BaseModel):
    id: uuid.UUID
    score: int
    total_questions: int
    time_taken: int | None
    completed_at: datetime | None

    model_config = {"from_attributes": True}
