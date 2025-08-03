import { Controller, UseGuards, Req, Post } from '@nestjs/common'
import { AiService } from './ai.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Request } from 'express'
import { ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('personalized')
  async getPersonalizedCourses(@Req() req: Request) {
    // JWT에서 사용자 ID 추출
    const userId = (req.user as { sub: number }).sub

    // 서비스에서 순수 코스 리스트 받아오기
    const recommendedCourses = await this.aiService.getRecommendations(userId)

    // 컨트롤러에서 HTTP 응답 형태로 변환
    return {
      success: true,
      data: recommendedCourses,
    }
  }
}
