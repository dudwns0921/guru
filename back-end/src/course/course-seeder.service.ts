import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { Course } from './course.entity'
import { seedCourses } from './seed-data'

@Injectable()
export class CourseSeederService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly dataSource: DataSource, // DataSource 주입
  ) {}

  async resetCourseIdSequence() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    try {
      await queryRunner.query('ALTER SEQUENCE "course_id_seq" RESTART WITH 1;')
      console.log('Course ID sequence reset.')
    } finally {
      await queryRunner.release()
    }
  }

  async seed() {
    console.log('Seeding courses...')

    for (const course of seedCourses) {
      // 동일한 id가 이미 존재하는지 확인
      const existingCourse = await this.courseRepository.findOne({ where: { id: course.id } })
      if (existingCourse) {
        console.log(`Course with id ${course.id} already exists. Skipping.`)
        continue
      }

      // 데이터 삽입
      await this.courseRepository.save(course)
      console.log(`Course with id ${course.id} seeded.`)
    }

    console.log('Courses seeding completed.')
  }
}
