import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from './review.entity'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  exports: [TypeOrmModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
