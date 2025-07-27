import { Injectable, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../user/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
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
