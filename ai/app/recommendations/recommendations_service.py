from typing import List
from app.utils.prompt_builder import build_prompt_for_recommendations
from app.recommendations.models.RecommendationRequest import Course
from langchain.schema import HumanMessage


class RecommendationsService:
    def __init__(self, llm_service):
        self.llm_service = llm_service

    def get_recommendations(self, user_preferences, courses: List[Course]) -> List[Course]:
        # LLM에 전달할 프롬프트 생성
        prompt = build_prompt_for_recommendations(user_preferences, courses)
        try:
            # LLM 호출
            response = self.llm_service.call_llm([HumanMessage(content=prompt)])
            print(f"LLM Response: {response}")
        except Exception as e:
            print(f"Error during LLM call: {e}")
            raise

        return []