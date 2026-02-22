import uuid

from fastapi import APIRouter

from app.api.deps import DBSession, CurrentUser
from app.schemas.notebook import NotebookCreate, NotebookUpdate, NotebookResponse
from app.services import notebook_service

router = APIRouter()


@router.get("/", response_model=list[NotebookResponse])
async def list_notebooks(db: DBSession, current_user: CurrentUser):
    """List user's notebooks."""
    notebooks = await notebook_service.get_notebooks(db, current_user.id)
    return [NotebookResponse.model_validate(n) for n in notebooks]


@router.post("/", response_model=NotebookResponse, status_code=201)
async def create_notebook(
    data: NotebookCreate, db: DBSession, current_user: CurrentUser
):
    """Create a new notebook."""
    notebook = await notebook_service.create_notebook(db, current_user.id, data)
    return NotebookResponse.model_validate(notebook)


@router.get("/{notebook_id}", response_model=NotebookResponse)
async def get_notebook(
    notebook_id: uuid.UUID, db: DBSession, current_user: CurrentUser
):
    """Get a notebook by ID."""
    notebook = await notebook_service.get_notebook_by_id(db, notebook_id, current_user.id)
    return NotebookResponse.model_validate(notebook)


@router.put("/{notebook_id}", response_model=NotebookResponse)
async def update_notebook(
    notebook_id: uuid.UUID,
    data: NotebookUpdate,
    db: DBSession,
    current_user: CurrentUser,
):
    """Update a notebook."""
    notebook = await notebook_service.update_notebook(db, notebook_id, current_user.id, data)
    return NotebookResponse.model_validate(notebook)


@router.delete("/{notebook_id}", status_code=204)
async def delete_notebook(
    notebook_id: uuid.UUID, db: DBSession, current_user: CurrentUser
):
    """Delete a notebook."""
    await notebook_service.delete_notebook(db, notebook_id, current_user.id)
