import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SearchHistory } from './search-history.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SearchHistory])],
  exports: [TypeOrmModule],
})
export class SearchHistoryModule {}
