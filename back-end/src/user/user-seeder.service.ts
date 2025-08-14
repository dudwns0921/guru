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

  async seed() {
    console.log('Seeding users...')

    try {
      for (const user of seedUsers) {
        // 동일한 id가 이미 존재하는지 확인
        const existingUser = await this.userRepository.findOne({ where: { id: user.id } })
        if (existingUser) {
          console.log(`User with id ${user.id} already exists. Skipping.`)
          continue
        }

        // 데이터 삽입 (ID를 명시적으로 지정)
        const newUser = this.userRepository.create(user)
        await this.userRepository.save(newUser)
        console.log(`User with id ${user.id} seeded.`)
      }

      // 시딩 완료 후 시퀀스를 최대 ID + 1로 설정
      await this.resetUserIdSequenceToMax()

      console.log('Users seeding completed.')
    } catch (error) {
      console.error('Error seeding users:', error)
    }
  }

  private async resetUserIdSequenceToMax() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    try {
      const maxId = await this.userRepository.maximum('id')
      const nextId = (maxId || 0) + 1
      await queryRunner.query(`ALTER SEQUENCE "user_id_seq" RESTART WITH ${nextId};`)
      console.log(`User ID sequence reset to ${nextId}.`)
    } finally {
      await queryRunner.release()
    }
  }
}
