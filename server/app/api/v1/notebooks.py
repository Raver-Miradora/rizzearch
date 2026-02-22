from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_notebooks():
    """List user's notebooks (tree structure)."""
    return {"message": "TODO: implement list notebooks"}


@router.post("/")
async def create_notebook():
    """Create a new notebook."""
    return {"message": "TODO: implement create notebook"}
