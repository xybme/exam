import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionControllor } from './question.controllor';
import { QuestionService } from './question.service';
import { QuestionEntity } from './question.entity'
import { OptionModule } from '../option/option.module'

@Module({
  imports: [
    OptionModule,
    TypeOrmModule.forFeature([QuestionEntity])
  ],
  controllers: [QuestionControllor],
  providers: [QuestionService]
})
export class QuestionModule {}