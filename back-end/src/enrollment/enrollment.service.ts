import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Enrollment } from './enrollment.entity'
import { Repository } from 'typeorm'

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}
  async enroll(userId: number, courseId: number) {
    const enrollment = this.enrollmentRepository.create({
      user: { id: userId },
      course: { id: courseId },
    })
    await this.enrollmentRepository.save(enrollment)
    return { success: true, enrollmentId: enrollment.id }
  }
}
