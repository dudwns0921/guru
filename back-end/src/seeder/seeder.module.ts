import { Module } from '@nestjs/common'
import { CourseModule } from '../course/course.module'
import { UserModule } from '../user/user.module'
import { ReviewModule } from '../review/review.module'
import { SeederService } from './seeder.service'

@Module({
  imports: [CourseModule, UserModule, ReviewModule],
  providers: [SeederService],
})
export class SeederModule {}
