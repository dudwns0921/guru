from app.utils.client import HttpClient


class CourseService:
    def __init__(self):
        client = HttpClient("http://localhost:3000")
        self.client = client

    def getCourses(self):
        """
        모든 강의를 가져옵니다.
        :return: 강의 목록
        """
        return self.client.get("/courses")
