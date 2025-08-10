import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common'
import axios, { AxiosError } from 'axios'
import { getAIServerUrl } from 'src/app.util'
import { CourseService } from 'src/course/course.service'
import { Enrollment } from 'src/enrollment/enrollment.entity'
import { EnrollmentService } from 'src/enrollment/enrollment.service'
import { AiEndpoint, AiResponseMap } from './ai.controller'

@Injectable()
export class AiService {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly courseService: CourseService,
  ) {}

  async getChatResponse(user_input: string) {
    const response = await this.callAiModule('chat', {
      user_input: user_input,
    })

    console.log('AI 챗봇 응답:', response)
    return response
  }

  async getRecommendations(userId: number) {
    try {
      // 1. 수강 내역 가져오기
      const enrollments = await this.enrollmentService.getMyEnrollments(userId)
      if (!enrollments || enrollments.length === 0) {
        return [] // 수강 내역이 없으면 빈 배열 반환
      }

      // 2. 태그별 가중치 계산
      const tagWeights = this.calculateTagWeights(enrollments)

      const courses = await this.courseService.findAll()

      const response = await this.callAiModule('recommendations', {
        user_id: userId,
        tag_weights: tagWeights,
        courses: courses,
        myCoursesIds: enrollments.map(enrollment => enrollment.course.id),
      })

      console.log('AI 추천 결과:', response)
      return response
    } catch (error) {
      console.error('AI 추천 서비스 오류:', error)

      // AI 모듈 관련 에러는 여기서 적절히 변환
      if (error instanceof AxiosError) {
        const status = error.response?.status
        const data = error.response?.data as { detail?: string } | undefined
        const message = data?.detail || error.message

        if (status === 400) {
          throw new BadRequestException(`AI 서비스 요청 오류: ${message}`)
        } else if (status === 500) {
          throw new InternalServerErrorException(`AI 추천 엔진 오류: ${message}`)
        } else {
          throw new InternalServerErrorException('AI 추천 서비스 연결 실패')
        }
      }

      // 기타 에러 (DB 조회 실패 등)
      throw new InternalServerErrorException('추천 데이터 준비 중 오류가 발생했습니다.')
    }
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

  private async callAiModule<T extends AiEndpoint>(endPoint: T, data: unknown) {
    const response = await axios.post<AiResponseMap<T>>(`${getAIServerUrl()}${endPoint}`, data)
    return response.data
  }
}
