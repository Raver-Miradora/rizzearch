from fastapi import APIRouter

router = APIRouter()


@router.post("/upload")
async def upload_document():
    """Upload file(s) for processing."""
    return {"message": "TODO: implement document upload"}


@router.get("/")
async def list_documents():
    """List uploaded documents."""
    return {"message": "TODO: implement list documents"}
