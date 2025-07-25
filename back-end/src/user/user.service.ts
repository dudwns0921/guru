import { Injectable, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 이메일 중복 확인
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    })

    if (existingUser) {
      throw new ConflictException('이미 등록된 이메일입니다.')
    }

    // 비밀번호 해싱
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds)

    // 새 사용자 생성 (해싱된 비밀번호로)
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })

    return await this.userRepository.save(user)
  }

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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
    })

    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
    return null
  }
}
