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
  async checkEnrollment(userId: number, courseId: number) {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
    })
    return { enrolled: !!enrollment }
  }

  async getMyEnrollments(userId: number) {
    return await this.enrollmentRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    })
  }

  async cancelEnrollment(userId: number, enrollmentId: number) {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id: enrollmentId, user: { id: userId } },
    })
    if (!enrollment) {
      throw new Error('Enrollment not found')
    }
    await this.enrollmentRepository.remove(enrollment)
    return { success: true }
  }
}
