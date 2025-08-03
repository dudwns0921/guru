from typing import Dict, List
from app.recommendations.models.RecommendationRequest import Course


def build_prompt_for_recommendations(user_preferences: Dict[str, float], courses: List[Course]) -> str:
    """
    사용자 선호도와 코스 데이터를 기반으로 LLM에 전달할 프롬프트를 생성합니다.
    """
    preferences_str = ", ".join([f"{tag}: {weight}" for tag, weight in user_preferences.items()])
    courses_str = "\n".join([f"ID {course.id}: {course.title} (Tags: {', '.join(course.tags)})" for course in courses])

    return f"""User Preferences: {preferences_str}

Available Courses:
{courses_str}

Based on the user's preferences, recommend exactly 5 courses that best match their interests.

IMPORTANT: Return ONLY the course IDs in the following JSON format:
{{
  "recommended_course_ids": [1, 2, 3, 4, 5]
}}

Do not include any other text or explanation. Return only the JSON with the 5 most relevant course IDs."""