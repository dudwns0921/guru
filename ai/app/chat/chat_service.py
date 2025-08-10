import json  # JSON 파싱을 위해 추가
from typing import List, Dict, Union
from langchain.prompts import PromptTemplate
from langchain.agents import initialize_agent, Tool


class ChatService:
    def __init__(self, llm_service):
        self.llm_service = llm_service
        self.default_prompt = PromptTemplate(
            input_variables=["user_input"],
            template=(
                "당신은 다재다능한 AI 비서입니다. 사용자의 요청에 따라 적절히 응답하세요.\n"
                "1. 사용자가 강의 추천을 요청하면, 반드시 도구를 호출하여 검색 결과를 확인한 후 강의를 추천하세요.\n"
                "2. 사용자가 강의 추천이 아닌 일반 대화를 요청하면, 적절한 대화로 응답하세요.\n"
                "반드시 아래와 같은 JSON 형식으로만 응답하세요:\n"
                "{{\n"
                '  "type": "recommendations" or "chat",\n'
                '  "content": [1, 2, 3] (강의 추천 시) 또는 "그냥 말" (일반 대화 시)\n'
                "}}\n\n"
                "JSON 형식 외의 응답은 허용되지 않습니다.\n"
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

        # 프롬프트 템플릿을 사용하여 사용자 입력을 처리
        try:
            prompt = self.default_prompt.format(user_input=user_input)
        except Exception as e:
            print(f"[ERROR] Failed to format prompt: {str(e)}")
            raise

        # 에이전트 호출
        try:
            print(f"[INFO] Sending prompt to agent: {prompt}")
            response = await self.agent.arun(prompt)
            print(f"[INFO] Agent response: {response}")
        except Exception as e:
            print(f"[ERROR] Failed to get response from agent: {str(e)}")
            raise

        # JSON 응답 파싱
        try:
            parsed_response = json.loads(response)  # JSON 문자열을 안전하게 파싱
            if (
                not isinstance(parsed_response, dict)
                or "type" not in parsed_response
                or "content" not in parsed_response
            ):
                raise ValueError("Invalid response format from agent.")
        except json.JSONDecodeError as e:
            print(f"[ERROR] Failed to parse agent response as JSON: {str(e)}")
            raise ValueError("Agent response is not in the expected JSON format.")
        except Exception as e:
            print(f"[ERROR] Unexpected error while parsing agent response: {str(e)}")
            raise

        return parsed_response
