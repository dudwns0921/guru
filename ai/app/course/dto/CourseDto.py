from typing import List
from pydantic import BaseModel


class Course(BaseModel):
    id: int
    title: str
    description: str
    instructor: str
    price: float
    thumbnailUrl: str
    tags: List[str]
    createdAt: str
