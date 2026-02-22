from fastapi import APIRouter

router = APIRouter()


@router.post("/register")
async def register():
    """Register a new user."""
    return {"message": "TODO: implement registration"}


@router.post("/login")
async def login():
    """Login and receive access + refresh tokens."""
    return {"message": "TODO: implement login"}


@router.post("/refresh")
async def refresh_token():
    """Refresh the access token."""
    return {"message": "TODO: implement token refresh"}


@router.post("/logout")
async def logout():
    """Invalidate the refresh token."""
    return {"message": "TODO: implement logout"}


@router.get("/me")
async def get_current_user():
    """Get the current authenticated user's profile."""
    return {"message": "TODO: implement get current user"}
