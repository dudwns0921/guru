import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Course } from './course.entity'
import { seedCourses } from './seed-data'

@Injectable()
export class CourseSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async onModuleInit() {
    await this.seed()
  }

  async seed() {
    try {
      const existingCourses = await this.courseRepository.count()

      if (existingCourses === 0) {
        console.log('🌱 Seeding course data...')
        await this.courseRepository.save(seedCourses)
        console.log(`✅ Successfully inserted ${seedCourses.length} courses!`)
      } else {
        console.log(`📋 Found ${existingCourses} existing courses, skipping seed...`)
      }
    } catch (error) {
      console.error('❌ Error seeding course data:', error)
    }
  }

  async clearAndSeed() {
    console.log('🗑️ Clearing existing course data...')
    await this.courseRepository.clear()
    await this.seed()
  }
}
