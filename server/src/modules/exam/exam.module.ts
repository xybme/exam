import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamControllor } from './exam.controllor'
import { ExamService } from './exam.service'
import { ExamEntity } from './exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity])],
  controllers: [ExamControllor],
  providers: [ExamService]
})
export class SurveyModule { }