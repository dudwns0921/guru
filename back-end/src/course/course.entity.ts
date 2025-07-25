import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { Enrollment } from '../enrollment/enrollment.entity'
import { Review } from '../review/review.entity'
import { CourseView } from '../course-view/course-view.entity'

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  description?: string

  @Column()
  instructor: string

  @Column({ type: 'decimal', default: 0 })
  price: number

  @Column()
  thumbnailUrl: string

  @Column('text', { array: true, default: [] })
  tags: string[]

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  averageRating: number // 평균 평점

  @Column({ type: 'int', default: 0 })
  totalEnrollments: number // 총 수강생 수

  @Column({ type: 'int', default: 0 })
  totalViews: number // 총 조회 수

  @CreateDateColumn()
  createdAt: Date

  // 관계 설정
  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[]

  @OneToMany(() => Review, review => review.course)
  reviews: Review[]

  @OneToMany(() => CourseView, courseView => courseView.course)
  courseViews: CourseView[]
}
