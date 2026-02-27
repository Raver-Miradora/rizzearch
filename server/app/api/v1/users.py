import uuid

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import DBSession, CurrentUser
from app.schemas.auth import UserResponse
from app.services import user_service, storage_service
from app.core.exceptions import BadRequestError

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_me(
    db: DBSession, current_user: CurrentUser
) -> UserResponse:
    user = await user_service.get_user_by_id(db, current_user.id)
    return UserResponse.model_validate(user)


@router.post("/me/avatar", response_model=UserResponse)
async def upload_avatar(
    file: UploadFile = File(...),
    db: DBSession = Depends(),
    current_user: CurrentUser = Depends(),
):
    # simple validation
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only images may be uploaded")
    try:
        url = await storage_service.upload_file(file, key=f"avatars/{uuid.uuid4()}")
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

    user = await user_service.update_avatar(db, current_user.id, url)
    return UserResponse.model_validate(user)


@router.patch("/me", response_model=UserResponse)
async def update_profile(
    full_name: str | None = None,
    db: DBSession = Depends(),
    current_user: CurrentUser = Depends(),
):
    updates = {}
    if full_name is not None:
        updates["full_name"] = full_name
    if not updates:
        raise BadRequestError("No changes provided")
    user = await user_service.update_user(db, current_user.id, **updates)
    return UserResponse.model_validate(user)
