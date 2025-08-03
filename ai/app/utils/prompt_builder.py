from typing import Dict, List
from app.recommendations.models.RecommendationRequest import Course


def build_prompt_for_recommendations(user_preferences: Dict[str, float], courses: List[Course]) -> str:
        """
        사용자 선호도와 코스 데이터를 기반으로 LLM에 전달할 프롬프트를 생성합니다.
        """
        preferences_str = ", ".join([f"{tag}: {weight}" for tag, weight in user_preferences.items()])
        courses_str = "\n".join([f"{course.id}: {course.title} ({', '.join(course.tags)})" for course in courses])

        return (
            f"User Preferences: {preferences_str}\n"
            f"Courses:\n{courses_str}\n"
            f"Recommend the top 5 courses for the user based on their preferences."
        )