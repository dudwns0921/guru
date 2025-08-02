import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { User } from './user.entity'
import { seedUsers } from './seed-data'

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource, // DataSource 주입
  ) {}

  async resetUserIdSequence() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    try {
      await queryRunner.query('ALTER SEQUENCE "user_id_seq" RESTART WITH 1;')
      console.log('User ID sequence reset.')
    } finally {
      await queryRunner.release()
    }
  }

  async seed() {
    console.log('Seeding users...')

    for (const user of seedUsers) {
      // 동일한 id가 이미 존재하는지 확인
      const existingUser = await this.userRepository.findOne({ where: { id: user.id } })
      if (existingUser) {
        console.log(`User with id ${user.id} already exists. Skipping.`)
        continue
      }

      // 데이터 삽입
      await this.userRepository.save(user)
      console.log(`User with id ${user.id} seeded.`)
    }

    console.log('Users seeding completed.')
  }
}
