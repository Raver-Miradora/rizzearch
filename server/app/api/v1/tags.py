import uuid

from fastapi import APIRouter

from app.api.deps import DBSession, CurrentUser
from app.schemas.tag import TagCreate, TagUpdate, TagResponse
from app.services import tag_service

router = APIRouter()


@router.get("/", response_model=list[TagResponse])
async def list_tags(db: DBSession, current_user: CurrentUser):
    """List all tags for the current user."""
    tags = await tag_service.get_tags(db, current_user.id)
    return [TagResponse.model_validate(t) for t in tags]


@router.post("/", response_model=TagResponse, status_code=201)
async def create_tag(data: TagCreate, db: DBSession, current_user: CurrentUser):
    """Create a new tag."""
    tag = await tag_service.create_tag(db, current_user.id, data)
    return TagResponse.model_validate(tag)


@router.put("/{tag_id}", response_model=TagResponse)
async def update_tag(
    tag_id: uuid.UUID, data: TagUpdate, db: DBSession, current_user: CurrentUser
):
    """Update a tag."""
    tag = await tag_service.update_tag(db, tag_id, current_user.id, data)
    return TagResponse.model_validate(tag)


@router.delete("/{tag_id}", status_code=204)
async def delete_tag(tag_id: uuid.UUID, db: DBSession, current_user: CurrentUser):
    """Delete a tag."""
    await tag_service.delete_tag(db, tag_id, current_user.id)
