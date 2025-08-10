from typing import List, Dict, Optional
from pydantic import BaseModel, Field, PrivateAttr
from langchain_core.tools import BaseTool
from app.course.course_service import CourseService


# 입력 스키마 정의
class SearchCoursesInput(BaseModel):
    query: str = Field(description="사용자가 검색하고자 하는 강의 키워드")


# SearchCoursesTool 정의
class SearchCoursesTool(BaseTool):
    name: str = "SearchCourses"
    description: str = "사용자의 요청에 따라 강의를 검색하고 추천합니다."
    args_schema: Optional[BaseModel] = SearchCoursesInput

    # course_service를 Pydantic 필드에서 제외
    _course_service: CourseService = PrivateAttr()

    def __init__(self, course_service: CourseService):
        super().__init__()
        if not course_service:
            raise ValueError("course_service is required but was not provided.")
        self._course_service = course_service
        print("[DEBUG] SearchCoursesTool initialized with CourseService.")

    def _run(self) -> List[Dict]:
        """
        동기적으로 강의를 검색합니다.
        """
        raise NotImplementedError(
            "SearchCoursesTool은 비동기적으로만 동작합니다. '_arun' 메서드를 사용하세요."
        )

    async def _arun(self, query: str) -> List[Dict]:
        """
        비동기적으로 강의를 검색합니다.
        """
        print(f"[DEBUG] Received query: {query}")

        # 비동기 호출
        courses = await self._course_service.getCourses()
        print(f"[DEBUG] Retrieved {len(courses)} courses from backend.")

        # 사용자의 요청에 따라 필터링
        recommended_courses = [
            course for course in courses if query.lower() in course["title"].lower()
        ]
        print(f"[DEBUG] Found {len(recommended_courses)} recommended courses.")

        # 추천 결과 반환
        return recommended_courses
