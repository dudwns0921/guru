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
    // 1. JWT에서 사용자 ID 추출
    const userId = (req.user as { sub: number }).sub

    // 4. LLM에 데이터 전달 및 추천 결과 가져오기
    const recommendedCourses = await this.aiService.getRecommendations(userId)

    // 5. 추천 결과 반환
    return recommendedCourses
  }
}
