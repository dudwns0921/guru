from app.course import course_service
from app.chat.tools import search_courses
from app.chat import chat_service
from app.chat.dto.ChatRequestDto import ChatRequestDto
from app.recommendations.dto.RecommendationRequestDto import RecommendationRequest
from app.llm import llm_service
from app.recommendations import recommendations_service
from fastapi import FastAPI, HTTPException
from langchain.agents import Tool

app = FastAPI()


@app.post("/chat")
async def post_chat(chat_request: ChatRequestDto):
    print(f"[INFO] Received chat request: {chat_request.user_input}")
    try:
        # LLM 서비스 초기화
        print("[INFO] Initializing LLMService...")
        llmService = llm_service.LLMService()
        print(f"[INFO] LLMService initialized with API key")

        # Chat 서비스 초기화
        print("[INFO] Initializing ChatService...")
        courseService = course_service.CourseService()
        search_tool = search_courses.SearchCoursesTool(course_service=courseService)
        search_courses_tool = Tool(
            name="SearchCourses",
            func=search_tool.search_courses,
            description="사용자의 요청에 따라 강의를 검색하고 추천합니다.",
        )

        chatService = chat_service.ChatService(llm_service=llmService)
        chatService.initialize_agent(tools=[search_courses_tool])
        print("[INFO] ChatService initialized successfully.")

        # Chat 서비스 호출
        print(f"[INFO] Calling ChatService with user input: {chat_request.user_input}")
        response = chatService.chat(user_input=chat_request.user_input)
        print(f"[INFO] ChatService response: {response}")

        return {"response": response}

    except ValueError as ve:
        print(f"[ERROR] ValueError occurred: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        print(f"[ERROR] Exception occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat service failed: {str(e)}")


@app.post("/recommendations")
async def post_recommendations(request: RecommendationRequest):
    print(f"[INFO] Received recommendation request: {request}")
    try:
        # LLM 서비스 초기화
        print("[INFO] Initializing LLMService...")
        llmService = llm_service.LLMService()
        print(f"[INFO] LLMService initialized with API key: {llmService.api_key}")

        # Recommendations 서비스 초기화
        print("[INFO] Initializing RecommendationsService...")
        recommendationsService = recommendations_service.RecommendationsService(
            llm_service=llmService
        )
        print("[INFO] RecommendationsService initialized successfully.")

        # Recommendations 서비스 호출
        print("[INFO] Calling RecommendationsService with user preferences...")
        recommendations = recommendationsService.get_recommendations(
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
