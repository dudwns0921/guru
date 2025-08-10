from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager

from app.chat import chat_controller
from app.recommendations import recommendations_controller
from app.recommendations.recommendations_service import RecommendationsService
from app.llm import llm_service
from app.chat.chat_service import ChatService
from app.course.course_service import CourseService
from app.chat.tools.search_courses import SearchCoursesTool


# Lifespan 이벤트 핸들러
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 서비스 객체 초기화
    print("[INFO] Initializing services...")
    llm_service_instance = llm_service.LLMService()
    course_service_instance = CourseService()

    search_courses_tool = SearchCoursesTool(course_service=course_service_instance)
    chat_service_instance = ChatService(llm_service=llm_service_instance)
    chat_service_instance.initialize_agent(tools=[search_courses_tool])

    recommendations_service_instance = RecommendationsService(
        llm_service=llm_service_instance
    )

    # FastAPI의 상태에 서비스 객체 저장
    app.state.llm_service = llm_service_instance
    app.state.chat_service = chat_service_instance
    app.state.recommendations_service = recommendations_service_instance

    print("[INFO] Services initialized successfully.")
    yield

    # 서비스 객체 정리
    print("[INFO] Shutting down services...")
    app.state.llm_service = None
    app.state.chat_service = None
    app.state.recommendations_service = None
    print("[INFO] Services shut down successfully.")


app = FastAPI(lifespan=lifespan)


# 라우터 등록
app.include_router(recommendations_controller.router)
app.include_router(chat_controller.router)
