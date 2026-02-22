from pydantic import BaseModel


class DashboardOverview(BaseModel):
    total_notes: int = 0
    total_flashcards: int = 0
    total_quizzes: int = 0
    study_streak: int = 0
    cards_due: int = 0
    avg_quiz_score: float = 0.0
