import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '../user/user.entity'
import { Course } from '../course/course.entity'

@Entity()
export class CourseView {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  viewedAt: Date

  // 관계 설정
  @ManyToOne(() => User, user => user.courseViews, { nullable: false })
  user: User

  @ManyToOne(() => Course, course => course.courseViews, { nullable: false })
  course: Course
}
