import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '../user/user.entity'
import { Course } from '../course/course.entity'

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  rating: number

  @Column({ type: 'text', nullable: true })
  comment: string | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // 관계 설정
  @ManyToOne(() => User, user => user.reviews, { nullable: false })
  user: User

  @ManyToOne(() => Course, course => course.reviews, { nullable: false })
  course: Course
}
