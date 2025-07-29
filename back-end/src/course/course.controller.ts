// src/course/course.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common'
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

  @Get(':id')
  getCourseById(@Param('id') id: number): Promise<Course | null> {
    return this.courseService.findOne(id)
  }
}
