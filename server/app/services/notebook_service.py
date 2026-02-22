import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError, ForbiddenError
from app.models.notebook import Notebook
from app.schemas.notebook import NotebookCreate, NotebookUpdate


async def create_notebook(
    db: AsyncSession, user_id: uuid.UUID, data: NotebookCreate
) -> Notebook:
    notebook = Notebook(
        user_id=user_id,
        title=data.title,
        description=data.description,
        parent_id=data.parent_id,
    )
    db.add(notebook)
    await db.commit()
    await db.refresh(notebook)
    return notebook


async def get_notebooks(db: AsyncSession, user_id: uuid.UUID) -> list[Notebook]:
    """Return all top-level notebooks for a user."""
    result = await db.execute(
        select(Notebook)
        .where(Notebook.user_id == user_id, Notebook.parent_id.is_(None))
        .order_by(Notebook.position, Notebook.title)
    )
    return list(result.scalars().all())


async def get_notebook_by_id(
    db: AsyncSession, notebook_id: uuid.UUID, user_id: uuid.UUID
) -> Notebook:
    result = await db.execute(select(Notebook).where(Notebook.id == notebook_id))
    notebook = result.scalar_one_or_none()
    if not notebook:
        raise NotFoundError("Notebook not found")
    if notebook.user_id != user_id:
        raise ForbiddenError("Not your notebook")
    return notebook


async def update_notebook(
    db: AsyncSession,
    notebook_id: uuid.UUID,
    user_id: uuid.UUID,
    data: NotebookUpdate,
) -> Notebook:
    notebook = await get_notebook_by_id(db, notebook_id, user_id)
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(notebook, field, value)
    await db.commit()
    await db.refresh(notebook)
    return notebook


async def delete_notebook(
    db: AsyncSession, notebook_id: uuid.UUID, user_id: uuid.UUID
) -> None:
    notebook = await get_notebook_by_id(db, notebook_id, user_id)
    await db.delete(notebook)
    await db.commit()
