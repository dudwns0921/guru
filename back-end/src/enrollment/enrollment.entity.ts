import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '../user/user.entity'
import { Course } from '../course/course.entity'

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  enrolledAt: Date

  // 관계 설정
  @ManyToOne(() => User, user => user.enrollments, { nullable: false })
  user: User

  @ManyToOne(() => Course, course => course.enrollments, { nullable: false })
  course: Course
}
