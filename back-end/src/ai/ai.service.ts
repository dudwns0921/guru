import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { getAIServerUrl } from 'src/app.util'
import { CourseService } from 'src/course/course.service'
import { Enrollment } from 'src/enrollment/enrollment.entity'
import { EnrollmentService } from 'src/enrollment/enrollment.service'

@Injectable()
export class AiService {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly courseService: CourseService,
  ) {}
  async getRecommendations(userId: number) {
    // 1. 수강 내역 가져오기
    const enrollments = await this.enrollmentService.getMyEnrollments(userId)

    // 2. 태그별 가중치 계산
    const tagWeights = this.calculateTagWeights(enrollments)

    const courses = await this.courseService.findAll()

    const response = await this.callAiModule('recommendations', {
      user_id: userId,
      tag_weights: tagWeights,
      courses: courses,
    })

    console.log('AI Module Response:', response)

    // 3. AI 추천 로직을 구현합니다.
    // 예: LLM 호출, 추천 결과 생성 등
    return [] // 추천 결과를 반환합니다.
  }

  private calculateTagWeights(enrollments: Enrollment[]): Record<string, number> {
    const tagWeights: Record<string, number> = {}

    for (const enrollment of enrollments) {
      const courseTags = enrollment.course.tags // 수강한 코스의 태그
      for (const tag of courseTags) {
        if (!tagWeights[tag]) {
          tagWeights[tag] = 0
        }
        tagWeights[tag] += 1 // 태그별 가중치 증가
      }
    }

    return tagWeights
  }

  private async callAiModule(endPoint: string, data: unknown): Promise<unknown> {
    try {
      console.log(`Calling AI module at ${endPoint} with data:`, data)
      const response = await axios.post(`${getAIServerUrl()}${endPoint}`, data)
      return response.data
    } catch (error) {
      console.error('Error calling AI module:', error)
      throw new Error('Failed to get recommendations from AI module')
    }
  }
}
