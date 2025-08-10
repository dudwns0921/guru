from fastapi import APIRouter, Depends, HTTPException, Request
from app.chat.dto.ChatResponseDto import ChatResponseDto
from app.chat.dto.ChatRequestDto import ChatRequestDto
from app.chat.chat_service import ChatService

# FastAPI 라우터 생성
router = APIRouter()


# 의존성 주입 함수
def get_chat_service(request: Request) -> ChatService:
    return request.app.state.chat_service


@router.post("/chat")
async def post_chat(
    chat_request: ChatRequestDto,
    chat_service: ChatService = Depends(get_chat_service),
):
    print(f"[INFO] Received chat request: {chat_request.user_input}")
    try:
        # Chat 서비스 호출
        print(f"[INFO] Calling ChatService with user input: {chat_request.user_input}")
        response = await chat_service.chat(user_input=chat_request.user_input)
        print(f"[INFO] ChatService response: {response}")

        return ChatResponseDto(response=response)

    except ValueError as ve:
        print(f"[ERROR] ValueError occurred: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        print(f"[ERROR] Exception occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat service failed: {str(e)}")
