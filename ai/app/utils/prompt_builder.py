from typing import Dict, List
from app.recommendations.models.RecommendationRequest import Course


def build_prompt_for_recommendations(user_preferences: Dict[str, float], courses: List[Course], myCoursesIds: List[int]) -> str:
    """
    사용자 선호도와 코스 데이터를 기반으로 LLM에 전달할 프롬프트를 생성합니다.
    """
    preferences_str = ", ".join([f"{tag}: {weight}" for tag, weight in user_preferences.items()])
    courses_str = "\n".join([f"ID {course.id}: {course.title} (Tags: {', '.join(course.tags)})" for course in courses])

    my_courses_str = ", ".join(map(str, myCoursesIds))

    return f"""User Preferences: {preferences_str}

Available Courses:
{courses_str}

The following course IDs should be excluded from recommendations as they are already taken by the user:
{my_courses_str}

Based on the user's preferences, recommend exactly 5 courses that best match their interests, excluding the courses listed above.

IMPORTANT: Return ONLY the course IDs in the following JSON format:
{{
  "recommended_course_ids": [1, 2, 3, 4, 5]
}}

Do not include any other text or explanation. Return only the JSON with the 5 most relevant course IDs."""