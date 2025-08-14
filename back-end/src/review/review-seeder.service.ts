import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { Review } from './review.entity'
import { seedReviews } from './seed-data'

@Injectable()
export class ReviewSeederService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly dataSource: DataSource, // DataSource 주입
  ) {}

  async seed() {
    console.log('Seeding reviews...')

    try {
      for (const review of seedReviews) {
        // 동일한 id가 이미 존재하는지 확인
        const existingReview = await this.reviewRepository.findOne({ where: { id: review.id } })
        if (existingReview) {
          console.log(`Review with id ${review.id} already exists. Skipping.`)
          continue
        }

        // 데이터 삽입 (ID를 명시적으로 지정)
        const newReview = this.reviewRepository.create(review)
        await this.reviewRepository.save(newReview)
        console.log(`Review with id ${review.id} seeded.`)
      }

      // 시딩 완료 후 시퀀스를 최대 ID + 1로 설정
      await this.resetReviewIdSequenceToMax()

      console.log('Reviews seeding completed.')
    } catch (error) {
      console.error('Error seeding reviews:', error)
    }
  }

  private async resetReviewIdSequenceToMax() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    try {
      // 현재 데이터베이스의 최대 ID를 찾아서 다음 시퀀스로 설정
      const maxId = await this.reviewRepository.maximum('id')
      const nextId = (maxId || 0) + 1

      await queryRunner.query(`ALTER SEQUENCE "review_id_seq" RESTART WITH ${nextId};`)
      console.log(`Review ID sequence reset to ${nextId}.`)
    } finally {
      await queryRunner.release()
    }
  }
}
