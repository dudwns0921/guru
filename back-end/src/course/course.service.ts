import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Course } from './course.entity'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find()
  }

  create(courseData: Partial<Course>): Promise<Course> {
    const course = this.courseRepository.create(courseData)
    return this.courseRepository.save(course)
  }

  findOne(id: number): Promise<Course | null> {
    return this.courseRepository.findOne({ where: { id } })
  }

  findByIds(ids: number[]): Promise<Course[]> {
    return this.courseRepository.find({
      where: {
        id: In(ids),
      },
    })
  }
}
