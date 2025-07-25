import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Enrollment } from './enrollment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  exports: [TypeOrmModule],
})
export class EnrollmentModule {}
