import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

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
}
