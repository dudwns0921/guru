from app.utils.server import getBackendUrl
from app.utils.client import HttpClient


class CourseService:
    def __init__(self):
        backend_url = getBackendUrl()
        print(f"[DEBUG] Backend URL: {backend_url}")
        self.client = HttpClient(backend_url)
        print("[DEBUG] HttpClient initialized with backend URL.")

    async def getCourses(self):
        """
        모든 강의를 가져옵니다.
        :return: 강의 목록
        """
        print("[DEBUG] Sending request to /courses endpoint...")
        try:
            response = await self.client.get("/courses")
            print(f"[DEBUG] Received response: {response}")
            return response
        except Exception as e:
            print(f"[ERROR] Failed to fetch courses: {str(e)}")
            raise
