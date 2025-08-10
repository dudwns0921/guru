from pydantic import BaseModel


class ChatRequestDto(BaseModel):
    user_input: str
