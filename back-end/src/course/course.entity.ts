import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { Enrollment } from '../enrollment/enrollment.entity'
import { Review } from '../review/review.entity'

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

  @CreateDateColumn()
  createdAt: Date

  // 관계 설정
  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[]

  @OneToMany(() => Review, review => review.course)
  reviews: Review[]
}
