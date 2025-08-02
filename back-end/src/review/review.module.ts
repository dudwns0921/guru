import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'
import { Review } from './review.entity'
import { ReviewSeederService } from './review-seeder-service'

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewSeederService],
  exports: [ReviewService, ReviewSeederService, TypeOrmModule],
})
export class ReviewModule {}
