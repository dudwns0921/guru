import { Injectable, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../user/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  // JWT 토큰 생성 메서드 추가
  generateTokens(user: User) {
    const payload = {
      sub: user.id, // 'sub'는 JWT 표준 클레임 (subject)
      email: user.email,
      name: user.name,
    }

    const accessToken = this.jwtService.sign(payload)

    // Refresh Token (더 긴 만료시간)
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' })

    return {
      accessToken,
      refreshToken,
    }
  }
}
