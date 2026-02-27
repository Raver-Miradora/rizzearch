from contextlib import asynccontextmanager

import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.config import settings


def init_sentry() -> None:
    if settings.SENTRY_DSN:
        sentry_sdk.init(
            dsn=settings.SENTRY_DSN,
            environment=settings.SENTRY_ENVIRONMENT,
            traces_sample_rate=0.2,
            profiles_sample_rate=0.1,
        )


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_sentry()

    # ensure full-text search index exists (notes.title + content_plain)
    # we create it here rather than relying on migrations so local dev is easy
    from sqlalchemy import select, text
    from app.database import async_session
    from app.models.user import User
    from app.core.security import hash_password

    try:
        async with async_session() as session:
            # create search index if missing
            await session.execute(
                text(
                    "CREATE INDEX IF NOT EXISTS idx_notes_search "
                    "ON notes USING GIN(to_tsvector('english', title || ' ' || content_plain));"
                )
            )

            # bootstrap an admin user if none exist
            result = await session.execute(select(User).limit(1))
            existing = result.scalar_one_or_none()
            if not existing:
                # pull credentials from env with sensible defaults
                from app.config import settings
                email = getattr(settings, "ADMIN_EMAIL", "admin@rizzearch.test")
                password = getattr(settings, "ADMIN_PASSWORD", "password123")
                full_name = getattr(settings, "ADMIN_NAME", "Admin User")
                user = User(
                    email=email,
                    password_hash=hash_password(password),
                    full_name=full_name,
                )
                session.add(user)
                # note: we don't log here since logger may not be configured

            await session.commit()
    except Exception:
        # ignore errors; database might not be ready yet
        pass

    yield
    # Shutdown


app = FastAPI(
    title=settings.APP_NAME,
    description="AI-Powered Study & Note Assistant",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ──── CORS ────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──── API Routes ────
app.include_router(api_router, prefix="/api/v1")


# ──── Health Checks ────
@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok", "service": settings.APP_NAME}


@app.get("/health/ready", tags=["Health"])
async def health_ready():
    """Readiness probe — checks DB and Redis connectivity."""
    from sqlalchemy import text

    from app.database import async_session

    checks = {"api": "ok", "database": "ok", "redis": "ok"}

    # Check database
    try:
        async with async_session() as session:
            await session.execute(text("SELECT 1"))
    except Exception as e:
        checks["database"] = f"error: {e}"

    # Check Redis
    try:
        import redis.asyncio as aioredis

        r = aioredis.from_url(settings.REDIS_URL)
        await r.ping()
        await r.aclose()
    except Exception as e:
        checks["redis"] = f"error: {e}"

    healthy = all(v == "ok" for v in checks.values())
    return {"status": "healthy" if healthy else "degraded", "checks": checks}
