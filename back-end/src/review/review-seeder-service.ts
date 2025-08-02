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

  async resetReviewIdSequence() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    try {
      await queryRunner.query('ALTER SEQUENCE "review_id_seq" RESTART WITH 1;')
      console.log('Review ID sequence reset.')
    } finally {
      await queryRunner.release()
    }
  }

  async seed() {
    console.log('Seeding reviews...')

    for (const review of seedReviews) {
      // Check if a review with the same id already exists
      const existingReview = await this.reviewRepository.findOne({ where: { id: review.id } })
      if (existingReview) {
        console.log(`Review with id ${review.id} already exists. Skipping.`)
        continue
      }

      // Insert the data
      await this.reviewRepository.save(review)
      console.log(`Review with id ${review.id} seeded.`)
    }

    console.log('Reviews seeding completed.')
  }
}
