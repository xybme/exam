import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 数据库
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DB_CONFIG } from '@/app.config'
// 模块
// import { UserModule } from './modules/user/user.module';
import { ExamModule } from './modules/exam/exam.module';
import { PositionModule } from './modules/position/postion.module'
import { QuestionModule } from './modules/question/question.module';
import { OptionModule } from './modules/option/option.module';
// import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...DB_CONFIG,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // UserModule,
    ExamModule,
    PositionModule,
    QuestionModule,
    OptionModule,
    // AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor ( private readonly connection: Connection) {}
}
