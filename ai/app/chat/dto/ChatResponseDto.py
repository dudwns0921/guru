from typing import Union, List
from pydantic import BaseModel


class ChatResponseDto(BaseModel):
    type: str  # 메시지 유형 ('chat' 또는 'recommendations')
    content: Union[str, List[int]]  # 메시지 내용 (문자열 또는 숫자 리스트)
