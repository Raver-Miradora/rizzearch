import io
import uuid
from typing import Optional

import anyio
from fastapi import UploadFile
from botocore.client import Config
import boto3

from app.config import settings


# The file already existed with a TODO; this module now provides a simple
# wrapper around boto3 for uploading arbitrary files to the configured bucket.
# We keep synchronous boto3 calls off the async event loop by using anyio
# thread workers.

def _get_s3_client():
    return boto3.client(
        "s3",
        endpoint_url=settings.S3_ENDPOINT,
        aws_access_key_id=settings.S3_ACCESS_KEY,
        aws_secret_access_key=settings.S3_SECRET_KEY,
        region_name=settings.S3_REGION,
        config=Config(signature_version="s3v4"),
    )


async def upload_file(file: UploadFile, key: Optional[str] = None) -> str:
    """Upload a FastAPI UploadFile to S3 and return its public URL.

    If `key` is omitted a random uuid-based key is generated. The
    configuration (`S3_ENDPOINT`, `S3_BUCKET`, etc.) comes from settings.

    The function also enforces the `MAX_FILE_SIZE_MB` limit.
    """

    contents = await file.read()
    max_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
    if len(contents) > max_bytes:
        raise ValueError(f"file exceeds maximum size of {settings.MAX_FILE_SIZE_MB}MB")

    ext = ""
    if file.filename and "." in file.filename:
        ext = file.filename.rsplit(".", 1)[1].lower()
        ext = f".{ext}"

    if not key:
        key = f"{uuid.uuid4()}{ext}"

    client = _get_s3_client()

    def _sync_upload() -> None:
        client.put_object(
            Bucket=settings.S3_BUCKET,
            Key=key,
            Body=contents,
            ContentType=file.content_type,
            ACL="public-read",
        )

    await anyio.to_thread.run_sync(_sync_upload)

    return f"{settings.S3_ENDPOINT.rstrip('/')}/{settings.S3_BUCKET}/{key}"
