import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CourseModule } from './course/course.module'
import { UserModule } from './user/user.module'
import { EnrollmentModule } from './enrollment/enrollment.module'
import { ReviewModule } from './review/review.module'
import { CourseViewModule } from './course-view/course-view.module'
import { SearchHistoryModule } from './search-history/search-history.module'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CourseModule,
    UserModule,
    EnrollmentModule,
    ReviewModule,
    CourseViewModule,
    SearchHistoryModule,
  ],
})
export class AppModule {}
