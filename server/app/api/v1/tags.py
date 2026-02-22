from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_tags():
    """List user's tags."""
    return {"message": "TODO: implement list tags"}


@router.post("/")
async def create_tag():
    """Create a new tag."""
    return {"message": "TODO: implement create tag"}
