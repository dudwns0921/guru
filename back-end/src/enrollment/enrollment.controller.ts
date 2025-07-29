import { Controller, Post, Body, Req, UseGuards, Get, Query } from '@nestjs/common'
import { Request } from 'express'
import { EnrollmentService } from './enrollment.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async checkEnrollment(@Query('courseId') courseId: number, @Req() req: Request) {
    const userId = (req.user as { sub: number }).sub
    return await this.enrollmentService.checkEnrollment(userId, courseId)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async enrollCourse(@Body('courseId') courseId: number, @Req() req: Request) {
    const userId = (req.user as { sub: number }).sub
    return await this.enrollmentService.enroll(userId, courseId)
  }
}
