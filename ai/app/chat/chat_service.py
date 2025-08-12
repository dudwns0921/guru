import json  # JSON 파싱을 위해 추가
from typing import List, Dict, Union
from langchain.prompts import PromptTemplate
from langchain.agents import Tool
from langchain.output_parsers import ResponseSchema, StructuredOutputParser


class ChatService:
    def __init__(self, llm_service):
        self.llm_service = llm_service
        response_schemas = [
            ResponseSchema(
                name="type", description="응답 유형 ('recommendations' 또는 'chat')"
            ),
            ResponseSchema(
                name="content",
                description="추천 강의 ID 목록 int[] 형태 (recommendations일 경우) 또는 일반 대화 내용 (chat일 경우)",
            ),
        ]
        # StructuredOutputParser 생성
        self.output_parser = StructuredOutputParser.from_response_schemas(
            response_schemas
        )
        self.default_prompt = PromptTemplate(
            input_variables=["user_input", "format_instructions"],
            template=(
                "당신은 다재다능한 AI 비서입니다. 사용자의 요청에 따라 적절히 응답하세요.\n"
                "1. 사용자가 강의 추천을 요청하면, 반드시 도구를 호출하여 검색 결과를 확인한 후 강의를 추천하세요.\n"
                "2. 사용자가 강의 추천이 아닌 일반 대화를 요청하면, 적절한 대화로 응답하세요.\n"
                "반드시 아래 형식에 맞게 응답하세요:\n"
                "{format_instructions}\n\n"
                "사용자 입력: {user_input}"
            ),
        )
        self.agent = None
        print("[INFO] ChatService initialized with default prompt.")

    def initialize_agent(self, tools: List[Tool]):
        """
        에이전트를 초기화합니다. 이 메서드는 LLMService를 사용하여 에이전트를 설정합니다.
        """
        from langchain.agents import initialize_agent, AgentType

        self.agent = initialize_agent(
            tools=tools,
            llm=self.llm_service.llm,
            agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True,
        )
        print("[INFO] Agent initialized successfully with provided tools.")

    async def chat(self, user_input: str) -> Dict[str, Union[str, List[int]]]:
        """
        사용자 입력에 따라 에이전트를 호출하고 응답을 반환합니다.
        :param user_input: 사용자의 요청
        :return: 에이전트의 응답 (type과 content로 구분)
        """
        if not self.agent:
            raise ValueError("Agent is not initialized. Call initialize_agent first.")

        # 프롬프트 생성
        prompt = self.default_prompt.format(
            user_input=user_input,
            format_instructions=self.output_parser.get_format_instructions(),
        )

        # 에이전트 호출
        response = await self.agent.arun(prompt)

        # 응답 파싱
        try:
            parsed_response = self.output_parser.parse(response)

            # 추천 강의 ID 목록을 배열로 강제 변환
            if parsed_response["type"] == "recommendations":
                if isinstance(parsed_response["content"], str):
                    try:
                        parsed_response["content"] = json.loads(
                            parsed_response["content"]
                        )
                    except json.JSONDecodeError:
                        raise ValueError(
                            "Invalid content format: Expected a JSON array."
                        )

                if not isinstance(parsed_response["content"], list):
                    parsed_response["content"] = []

            return parsed_response
        except Exception as e:
            raise ValueError(f"Failed to parse response: {str(e)}")
