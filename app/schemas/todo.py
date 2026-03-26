from sqlmodel import SQLModel


class TodoResponse(SQLModel):
    userId: int
    id: int
    title: str
    completed: bool
