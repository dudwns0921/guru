from langchain_openai import ChatOpenAI  # 변경된 import 경로
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv()

class LLMService:
    def __init__(self):
        # .env에서 API 키 가져오기
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY is not set in the .env file")

        # OpenAI LLM 초기화
        self.llm = ChatOpenAI(openai_api_key=api_key, model_name="gpt-3.5-turbo", max_tokens=100)

    def call_llm(self, prompt: str) -> str:
        # LangChain의 OpenAI LLM을 호출 (invoke 메서드 사용)
        response = self.llm.invoke(prompt)
        print(f"Raw LLM Response: {response}")
        return response