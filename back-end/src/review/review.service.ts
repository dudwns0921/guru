import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Review } from './review.entity'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findByCourse(courseId: number) {
    return this.reviewRepository.find({
      where: { course: { id: courseId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    })
  }

  async findByUserAndCourse(userId: number, courseId: number) {
    return this.reviewRepository.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
      relations: ['user'],
    })
  }

  async createReview({
    userId,
    courseId,
    rating,
    comment,
  }: {
    userId: number
    courseId: number
    rating: number
    comment: string
  }) {
    const review = this.reviewRepository.create({
      rating,
      comment,
      user: { id: userId },
      course: { id: courseId },
    })
    return await this.reviewRepository.save(review)
  }

  async updateReview(
    id: number,
    userId: number,
    { rating, comment }: { rating: number; comment: string },
  ) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user'],
    })
    if (!review) throw new NotFoundException('Review not found')
    if (review.user.id !== userId) throw new ForbiddenException('No permission to edit this review')
    review.rating = rating
    review.comment = comment
    return await this.reviewRepository.save(review)
  }

  async deleteReview(id: number, userId: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user'],
    })
    if (!review) throw new NotFoundException('Review not found')
    if (review.user.id !== userId)
      throw new ForbiddenException('No permission to delete this review')
    await this.reviewRepository.delete(id)
    return { success: true }
  }
}
