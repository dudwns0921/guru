from fastapi import APIRouter, Depends, HTTPException, Request
from app.recommendations.dto.RecommendationRequestDto import RecommendationRequest
from app.recommendations.recommendations_service import RecommendationsService

# FastAPI 라우터 생성
router = APIRouter()


# 의존성 주입 함수
def get_recommendations_service(request: Request) -> RecommendationsService:
    return request.app.state.recommendations_service


@router.post("/recommendations")
async def post_recommendations(
    request: RecommendationRequest,
    recommendations_service: RecommendationsService = Depends(
        get_recommendations_service
    ),  # 의존성 주입
):
    print(f"[INFO] Received recommendation request: {request}")
    try:
        # Recommendations 서비스 호출
        print("[INFO] Calling RecommendationsService with user preferences...")
        recommendations = recommendations_service.get_recommendations(
            user_preferences=request.tag_weights,
            courses=request.courses,
            myCoursesIds=request.myCoursesIds,
        )
        print(f"[INFO] RecommendationsService response: {recommendations}")

        # 성공 시 데이터 반환
        return recommendations

    except Exception as e:
        print(f"[ERROR] Exception occurred: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"AI recommendation failed: {str(e)}"
        )
