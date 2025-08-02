import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { CourseSeederService } from '../course/course-seeder.service'
import { UserSeederService } from 'src/user/user-seeder-service'
import { ReviewSeederService } from 'src/review/review-seeder-service'

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly courseSeederService: CourseSeederService,
    private readonly userSeederService: UserSeederService,
    private readonly reviewSeederService: ReviewSeederService,
  ) {}

  async onApplicationBootstrap() {
    console.log('Starting data seeding...')

    // 1. 유저 ID 시퀀스 초기화
    await this.userSeederService.resetUserIdSequence()

    // 2. 코스 ID 시퀀스 초기화
    await this.courseSeederService.resetCourseIdSequence()

    // 3. 리뷰 ID 시퀀스 초기화
    await this.reviewSeederService.resetReviewIdSequence()

    // 1. 코스 데이터 생성
    await this.courseSeederService.seed()

    // 2. 유저 데이터 생성
    await this.userSeederService.seed()

    // 3. 리뷰 데이터 생성
    await this.reviewSeederService.seed()

    console.log('Data seeding completed.')
  }
}
