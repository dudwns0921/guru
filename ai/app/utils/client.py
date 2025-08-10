import httpx


class HttpClient:
    def __init__(self, base_url: str):
        """
        HTTP 클라이언트 초기화
        :param base_url: 서버의 기본 URL
        """
        self.base_url = base_url
        self.client = httpx.AsyncClient(base_url=self.base_url)

    async def get(self, endpoint: str, params: dict = None):
        """
        GET 요청
        :param endpoint: 요청할 엔드포인트
        :param params: 쿼리 파라미터
        :return: JSON 응답 데이터
        """
        url = f"{self.base_url}{endpoint}"
        print(f"[DEBUG] Sending GET request to {url} with params: {params}")
        try:
            response = await self.client.get(endpoint, params=params)
            response.raise_for_status()
            print(
                f"[DEBUG] Received response: {response.status_code} - {response.text}"
            )
            return response.json()
        except httpx.HTTPStatusError as e:
            print(f"HTTP error occurred: {e.response.status_code} - {e.response.text}")
            raise
        except httpx.RequestError as e:
            print(f"Request error occurred: {e}")
            raise
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            raise

    async def post(self, endpoint: str, data: dict = None):
        """
        POST 요청
        :param endpoint: 요청할 엔드포인트
        :param data: 요청 바디 데이터
        :return: JSON 응답 데이터
        """
        try:
            response = await self.client.post(endpoint, json=data)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            # HTTP 상태 코드 에러 처리
            print(f"HTTP error occurred: {e.response.status_code} - {e.response.text}")
            raise
        except httpx.RequestError as e:
            # 요청 중 발생한 네트워크 에러 처리
            print(f"Request error occurred: {e}")
            raise
        except Exception as e:
            # 기타 예외 처리
            print(f"An unexpected error occurred: {e}")
            raise

    async def close(self):
        """
        클라이언트 세션 종료
        """
        await self.client.aclose()
