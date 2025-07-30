import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('by-course')
  async getReviewsByCourse(@Query('courseId') courseId: number) {
    return await this.reviewService.findByCourse(courseId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async checkMyReview(@Query('courseId') courseId: number, @Req() req: Request) {
    const userId = (req.user as { sub: number }).sub
    const review = await this.reviewService.findByUserAndCourse(userId, courseId)
    return { hasReview: !!review, review }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReview(
    @Body('courseId') courseId: number,
    @Body('rating') rating: number,
    @Body('comment') comment: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as { sub: number }).sub
    return await this.reviewService.createReview({ userId, courseId, rating, comment })
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateReview(
    @Param('id') id: number,
    @Body('rating') rating: number,
    @Body('comment') comment: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as { sub: number }).sub
    return await this.reviewService.updateReview(id, userId, { rating, comment })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteReview(@Param('id') id: number, @Req() req: Request) {
    const userId = (req.user as { sub: number }).sub
    return await this.reviewService.deleteReview(id, userId)
  }
}
