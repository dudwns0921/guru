from typing import Dict, List
from pydantic import BaseModel

from app.course.dto.CourseDto import Course


class RecommendationRequest(BaseModel):
    user_id: int
    tag_weights: Dict[str, float]
    courses: List[Course] = []
    myCoursesIds: List[int] = []
