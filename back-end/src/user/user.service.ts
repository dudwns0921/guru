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

  async remove(id: number): Promise<void> {
    // Soft delete - isActive를 false로 변경
    await this.userRepository.update(id, { isActive: false })
  }
}
