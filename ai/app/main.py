from fastapi import FastAPI, HTTPException
from fastapi.concurrency import asynccontextmanager
from app.recommendations import recommendations_service
from app.recommendations.dto.RecommendationRequestDto import RecommendationRequest
from app.chat.dto.ChatRequestDto import ChatRequestDto
from app.course import course_service
from app.chat.tools import search_courses
from app.chat import chat_service
from app.llm import llm_service

# 전역 변수로 서비스 객체를 저장
llm_service_instance = None
chat_service_instance = None


async def startup_event():
    print("[INFO] Starting up services...")
    global llm_service_instance, chat_service_instance

    # LLM 서비스 초기화
    llm_service_instance = llm_service.LLMService()

    # Chat 서비스 초기화
    try:
        courseService = course_service.CourseService()

        search_courses_tool = search_courses.SearchCoursesTool(
            course_service=courseService
        )
        chat_service_instance = chat_service.ChatService(
            llm_service=llm_service_instance
        )
        chat_service_instance.initialize_agent(tools=[search_courses_tool])
    except Exception as e:
        print(f"[ERROR] Failed to initialize SearchCoursesTool: {str(e)}")
        raise


async def shutdown_event():
    print("[INFO] Shutting down services...")
    # 필요한 종료 작업 수행
    global llm_service_instance, chat_service_instance
    llm_service_instance = None
    chat_service_instance = None
    print("[INFO] Services shut down successfully.")


@asynccontextmanager
async def lifeSpan(app: FastAPI):
    # 애플리케이션 시작 시 호출되는 이벤트
    await startup_event()
    yield
    # 애플리케이션 종료 시 호출되는 이벤트
    await shutdown_event()


# FastAPI 애플리케이션 생성
app = FastAPI(lifespan=lifeSpan)


@app.post("/chat")
async def post_chat(chat_request: ChatRequestDto):
    print(f"[INFO] Received chat request: {chat_request.user_input}")
    try:
        # Chat 서비스 호출
        print(f"[INFO] Calling ChatService with user input: {chat_request.user_input}")
        response = await chat_service_instance.chat(user_input=chat_request.user_input)
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
        # Recommendations 서비스 초기화
        print("[INFO] Initializing RecommendationsService...")
        recommendationsService = recommendations_service.RecommendationsService(
            llm_service=llm_service_instance
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
