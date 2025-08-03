import { Module } from '@nestjs/common'
import { AiController } from './ai.controller'
import { AiService } from './ai.service'
import { EnrollmentModule } from 'src/enrollment/enrollment.module'
import { CourseModule } from 'src/course/course.module'

@Module({
  imports: [EnrollmentModule, CourseModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [],
})
export class AiModule {}
