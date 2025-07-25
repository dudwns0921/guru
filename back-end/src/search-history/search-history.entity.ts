import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  searchQuery: string

  @Column({ type: 'int', default: 0 })
  resultCount: number // 검색 결과 개수

  @CreateDateColumn()
  searchedAt: Date

  // 관계 설정
  @ManyToOne(() => User, user => user.searchHistory, { nullable: false })
  user: User
}
