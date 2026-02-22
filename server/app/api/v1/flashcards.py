from fastapi import APIRouter

router = APIRouter()


@router.get("/decks")
async def list_decks():
    """List user's flashcard decks."""
    return {"message": "TODO: implement list decks"}


@router.post("/decks")
async def create_deck():
    """Create a new flashcard deck."""
    return {"message": "TODO: implement create deck"}
