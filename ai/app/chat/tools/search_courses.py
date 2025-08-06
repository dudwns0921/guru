from typing import List, Dict
from app.course.course_service import CourseService


class SearchCoursesTool:
    def __init__(self, course_service: CourseService):
        """
        SearchCoursesTool 초기화
        :param course_service: CourseService 인스턴스
        """
        self.course_service = course_service

    async def search_courses(self, query: str) -> List[Dict]:
        """
        사용자의 요청에 따라 강의를 검색하고 추천
        :param query: 사용자가 요청한 키워드
        :return: 추천된 강의 목록
        """
        print(f"[DEBUG] Received query: {query}")
        # 백엔드에서 전체 코스 정보 가져오기
        courses = await self.course_service.get_courses()

        # 사용자의 요청에 따라 필터링
        recommended_courses = [
            course for course in courses if query.lower() in course["title"].lower()
        ]

        # 추천 결과 반환
        return recommended_courses
