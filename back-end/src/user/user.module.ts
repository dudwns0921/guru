import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserSeederService } from './user-seeder.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserSeederService], // UserSeederService 추가
  exports: [UserService, UserSeederService, TypeOrmModule], // UserSeederService를 exports에 추가
})
export class UserModule {}
