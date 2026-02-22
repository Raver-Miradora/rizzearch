from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_quizzes():
    """List user's quizzes."""
    return {"message": "TODO: implement list quizzes"}
