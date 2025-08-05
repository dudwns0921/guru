from typing import Dict, List
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

class RecommendationRequest(BaseModel):
    user_id: int
    tag_weights: Dict[str, float]
    courses: List[Course] = [] 
    myCoursesIds: List[int] = [] 