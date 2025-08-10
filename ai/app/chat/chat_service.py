from typing import List
from langchain.prompts import PromptTemplate
from langchain.agents import initialize_agent, Tool


class ChatService:
    def __init__(self, llm_service):
        self.llm_service = llm_service
        self.default_prompt = PromptTemplate(
            input_variables=["user_input"],
            template=(
                "당신은 강의 추천 전문가입니다. 사용자의 요청에 따라 적절한 강의를 추천하세요.\n"
                "강의를 추천하기 위해 필요한 경우, 반드시 도구를 호출하여 검색 결과를 확인하세요.\n"
                "반드시 아래와 같은 JSON 형식으로만 응답하세요:\n"
                "{{\n"
                '  "recommended_course_ids": [1, 2, 3]\n'
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

    async def chat(self, user_input: str) -> str:
        """
        사용자 입력에 따라 에이전트를 호출하고 응답을 반환합니다.
        :param user_input: 사용자의 요청
        :return: 에이전트의 응답
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
        response = await self.agent.arun(prompt)

        return response
