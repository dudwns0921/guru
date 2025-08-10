import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { Enrollment } from '../enrollment/enrollment.entity'
import { Review } from '../review/review.entity'
import { Exclude } from 'class-transformer'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  name: string

  @Exclude({ toPlainOnly: true }) // 직렬화 시 제외
  @Column()
  password: string

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  // 관계 설정

  @OneToMany(() => Enrollment, enrollment => enrollment.user)
  enrollments: Enrollment[]

  @OneToMany(() => Review, review => review.user)
  reviews: Review[]
}
