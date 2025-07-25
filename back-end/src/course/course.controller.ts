// src/course/course.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common'
import { CourseService } from './course.service'
import { Course } from './course.entity'

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getCourses(): Promise<Course[]> {
    return this.courseService.findAll()
  }

  @Post()
  createCourse(@Body() body: Partial<Course>): Promise<Course> {
    return this.courseService.create(body)
  }
}
