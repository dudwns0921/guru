import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CourseView } from './course-view.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CourseView])],
  exports: [TypeOrmModule],
})
export class CourseViewModule {}
