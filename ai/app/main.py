from app.llm import llm_service
from app.recommendations import recommendations_service
from app.recommendations.models.RecommendationRequest import RecommendationRequest
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.post("/recommendations")
async def post_recommendations(request: RecommendationRequest):
    try:
        llmService = llm_service.LLMService()
        recommendationsService = recommendations_service.RecommendationsService(llm_service=llmService)
        recommendations = recommendationsService.get_recommendations(
            user_preferences=request.tag_weights, 
            courses=request.courses,
            myCoursesIds=request.myCoursesIds
        )
        
        # 성공 시 데이터만 반환 (AI 모듈은 순수 데이터 반환)
        return recommendations
        
    except Exception as e:
        # AI 관련 에러는 HTTP 에러로 변환
        raise HTTPException(status_code=500, detail=f"AI recommendation failed: {str(e)}")