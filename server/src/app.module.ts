import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 数据库
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DB_CONFIG } from './app.config'
// 模块
import { ExamModule } from './modules/exam/exam.module';
import { PositionModule } from './modules/position/postion.module'
import { QuestionModule } from './modules/question/question.module';
import { OptionModule } from './modules/option/option.module';
import { ResultModule } from './modules/result/result.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...DB_CONFIG,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        // other transports...
      ],
      // other options
    }),
    ExamModule,
    PositionModule,
    QuestionModule,
    OptionModule,
    ResultModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor ( private readonly connection: Connection) {}
}
