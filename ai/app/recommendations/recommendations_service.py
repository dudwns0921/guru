import json
from typing import List
from app.utils.prompt_builder import build_prompt_for_recommendations
from app.recommendations.models.RecommendationRequest import Course
from langchain.schema import HumanMessage


class RecommendationsService:
    def __init__(self, llm_service):
        self.llm_service = llm_service

    def get_recommendations(self, user_preferences, courses: List[Course], myCoursesIds: List[int]) -> List[Course]:
        # LLM에 전달할 프롬프트 생성
        prompt = build_prompt_for_recommendations(user_preferences, courses, myCoursesIds)
        try:
            # LLM 호출
            response = self.llm_service.call_llm([HumanMessage(content=prompt)])
            print(f"LLM Response: {response}")
            
            # JSON에서 course IDs 추출
            recommended_ids = self._extract_course_ids(response.content)
            print(f"Extracted Course IDs: {recommended_ids}")
            
            # ID에 해당하는 Course 객체들 반환
            recommended_courses = self._get_courses_by_ids(recommended_ids, courses)
            return recommended_courses
            
        except Exception as e:
            print(f"Error during LLM call: {e}")
            # 에러 시 랜덤 5개 코스 반환
            return courses[:5] if len(courses) >= 5 else courses

    def _extract_course_ids(self, response_content: str) -> List[int]:
        """LLM 응답에서 course ID들을 추출합니다."""
        try:
            # JSON 파싱
            parsed_response = json.loads(response_content)
            return parsed_response.get("recommended_course_ids", [])
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            return []

    def _get_courses_by_ids(self, course_ids: List[int], all_courses: List[Course]) -> List[Course]:
        """주어진 ID들에 해당하는 Course 객체들을 반환합니다."""
        course_dict = {course.id: course for course in all_courses}
        recommended_courses = []
        
        for course_id in course_ids:
            if course_id in course_dict:
                recommended_courses.append(course_dict[course_id])
        
        return recommended_courses