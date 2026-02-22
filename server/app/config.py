from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # ──── App ────
    APP_NAME: str = "Rizzearch"
    DEBUG: bool = False
    FRONTEND_URL: str = "http://localhost:3000"
    BACKEND_URL: str = "http://localhost:8000"

    # ──── Database (Neon) ────
    DATABASE_URL: str = "postgresql+asyncpg://user:pass@localhost:5432/rizzearch"

    # ──── Redis (Upstash) ────
    REDIS_URL: str = "redis://localhost:6379"

    # ──── JWT ────
    JWT_SECRET_KEY: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ──── OpenAI ────
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"

    # ──── S3 / DigitalOcean Spaces ────
    S3_ENDPOINT: str = "http://localhost:9000"
    S3_BUCKET: str = "rizzearch-uploads"
    S3_ACCESS_KEY: str = "minioadmin"
    S3_SECRET_KEY: str = "minioadmin"
    S3_REGION: str = "nyc3"
    MAX_FILE_SIZE_MB: int = 20

    # ──── Email (Resend) ────
    RESEND_API_KEY: str = ""
    EMAIL_FROM: str = "noreply@rizzearch.tech"

    # ──── Sentry ────
    SENTRY_DSN: str = ""
    SENTRY_ENVIRONMENT: str = "development"

    # ──── OAuth ────
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""


settings = Settings()
