import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { isActive: true },
    })
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id, isActive: true },
      relations: ['enrollments', 'reviews', 'courseViews', 'searchHistory'],
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email, isActive: true },
    })
  }

  async removeMe(id: number) {
    // User와 관련된 모든 데이터 삭제
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['enrollments', 'reviews', 'courseViews', 'searchHistory'],
    })
    if (!user) return

    // 관련 데이터 삭제
    await Promise.all([
      ...user.enrollments.map(e => this.userRepository.manager.delete('Enrollment', e.id)),
      ...user.reviews.map(r => this.userRepository.manager.delete('Review', r.id)),
      ...user.courseViews.map(cv => this.userRepository.manager.delete('CourseView', cv.id)),
      ...user.searchHistory.map(sh => this.userRepository.manager.delete('SearchHistory', sh.id)),
    ])

    // 마지막으로 유저 삭제
    await this.userRepository.delete(id)

    return {
      success: true,
    }
  }
}
