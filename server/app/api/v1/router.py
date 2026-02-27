from fastapi import APIRouter

from app.api.v1 import auth, notes, notebooks, tags, documents, ai, flashcards, quizzes, analytics, users

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(notes.router, prefix="/notes", tags=["Notes"])
api_router.include_router(notebooks.router, prefix="/notebooks", tags=["Notebooks"])
api_router.include_router(tags.router, prefix="/tags", tags=["Tags"])
api_router.include_router(documents.router, prefix="/documents", tags=["Documents"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI"])
api_router.include_router(flashcards.router, prefix="/flashcards", tags=["Flashcards"])
api_router.include_router(quizzes.router, prefix="/quizzes", tags=["Quizzes"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
