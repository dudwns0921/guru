import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Enrollment } from './enrollment.entity'
import { EnrollmentController } from './enrollment.controller'
import { EnrollmentService } from './enrollment.service'

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  exports: [TypeOrmModule, EnrollmentService],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
