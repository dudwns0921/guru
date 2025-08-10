import { Controller, UseGuards, Req, Get, Post, Body } from '@nestjs/common'
import { AiService } from './ai.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Request } from 'express'
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { ChatRequestDto } from './dto/chat-request.dto'
import { Course } from 'src/course/course.entity'

export type AiEndpoint = 'chat' | 'recommendations'

export interface AiResponseMap<T extends AiEndpoint> {
  chat: { type: T; content: string | number[] }
  recommendations: Course[]
}

@ApiBearerAuth()
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Get('personalized')
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

  @UseGuards(JwtAuthGuard)
  @Post('chat')
  @ApiBody({ type: ChatRequestDto })
  async postChat(@Body() body: ChatRequestDto) {
    // 요청 본문에서 사용자 입력 추출
    const { user_input } = body

    // 서비스에서 챗봇 응답 받아오기
    const chatResponse = await this.aiService.getChatResponse(user_input)

    // 컨트롤러에서 HTTP 응답 형태로 변환
    return {
      success: true,
      data: chatResponse,
    }
  }
}
