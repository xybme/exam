import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamControllor } from './exam.controllor'
import { ExamService } from './exam.service'
import { ExamEntity } from './exam.entity';
import { QuestionModule } from '../question/question.module'
import { ResultModule } from '../result/result.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamEntity]),
    QuestionModule,
    ResultModule
  ],
  controllers: [ExamControllor],
  providers: [ExamService]
})
export class ExamModule { }