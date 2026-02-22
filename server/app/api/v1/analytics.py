from fastapi import APIRouter

router = APIRouter()


@router.get("/overview")
async def dashboard_overview():
    """Dashboard stats (notes, cards, streaks)."""
    return {"message": "TODO: implement dashboard overview"}
