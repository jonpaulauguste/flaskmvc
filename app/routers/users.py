from fastapi import HTTPException
import httpx

from app.dependencies import SessionDep
from app.repositories.user import UserRepository
from app.schemas import TodoResponse, UserResponse
from app.services.user_service import UserService

from . import api_router


@api_router.get("/users", response_model=list[UserResponse])
async def list_users(db: SessionDep):
    user_repo = UserRepository(db)
    user_service = UserService(user_repo)
    return user_service.get_all_users()


@api_router.get("/todos", response_model=list[TodoResponse])
async def list_todos():
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get("https://jsonplaceholder.typicode.com/todos")
            response.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=503, detail="Unable to load todos") from exc

    return response.json()[:50]
