from pydantic import BaseModel


class ChatResponseDto(BaseModel):
    response: str
