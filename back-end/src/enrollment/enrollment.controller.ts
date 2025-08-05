import { Controller, Post, Body, Req, UseGuards, Get, Query, Delete } from '@nestjs/common'
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

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyEnrollments(@Req() req: Request) {
    const userId = (req.user as { sub: number }).sub
    return await this.enrollmentService.getMyEnrollments(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':enrollmentId')
  async cancelEnrollment(@Body('enrollmentId') enrollmentId: number, @Req() req: Request) {
    const userId = (req.user as { sub: number }).sub
    return await this.enrollmentService.cancelEnrollment(userId, enrollmentId)
  }
}
