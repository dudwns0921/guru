
from app.llm import llm_service
from app.recommendations import recommendations_service
from app.recommendations.models.RecommendationRequest import RecommendationRequest
from fastapi import FastAPI

app = FastAPI()

@app.post("/recommendations")
async def post_recommendations(request: RecommendationRequest):
    print(f"User ID: {request.user_id}")
    print(f"Tag Weights: {request.tag_weights}")
    print(f"Courses: {request.courses}")
    llmService = llm_service.LLMService()
    recommendationsService = recommendations_service.RecommendationsService(llm_service=llmService)
    recommendations = recommendationsService.get_recommendations(user_preferences=request.tag_weights, courses=request.courses)
    return {"message": "Here are your recommendations", "data": recommendations}