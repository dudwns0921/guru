import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CourseController } from './course.controller'
import { CourseService } from './course.service'
import { Course } from './course.entity'
import { CourseSeederService } from './course-seeder.service'

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService, CourseSeederService],
  exports: [CourseService, CourseSeederService, TypeOrmModule],
})
export class CourseModule {}
