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

  private async resetCourseIdSequenceToMax() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    try {
      // 현재 데이터베이스의 최대 ID를 찾아서 다음 시퀀스로 설정
      const maxId = await this.courseRepository.maximum('id')
      const nextId = (maxId || 0) + 1

      await queryRunner.query(`ALTER SEQUENCE "course_id_seq" RESTART WITH ${nextId};`)
      console.log(`Course ID sequence reset to ${nextId}.`)
    } finally {
      await queryRunner.release()
    }
  }

  async seed() {
    console.log('Seeding courses...')

    try {
      for (const course of seedCourses) {
        // 동일한 id가 이미 존재하는지 확인
        const existingCourse = await this.courseRepository.findOne({ where: { id: course.id } })
        if (existingCourse) {
          console.log(`Course with id ${course.id} already exists. Skipping.`)
          continue
        }

        // 데이터 삽입 (ID를 명시적으로 지정)
        const newCourse = this.courseRepository.create(course)
        await this.courseRepository.save(newCourse)
        console.log(`Course with id ${course.id} seeded.`)
      }

      // 시딩 완료 후 시퀀스를 최대 ID + 1로 설정
      await this.resetCourseIdSequenceToMax()

      console.log('Courses seeding completed.')
    } catch (error) {
      console.error('Error seeding courses:', error)
    }
  }
}
