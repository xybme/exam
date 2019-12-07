import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamControllor } from './exam.controllor'
import { ExamService } from './exam.service'
import { ExamEntity } from './exam.entity';
import { QuestionModule } from '../question/question.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamEntity]),
    QuestionModule
  ],
  controllers: [ExamControllor],
  providers: [ExamService]
})
export class ExamModule { }