import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from './question.entity';


@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionEntity: Repository<QuestionEntity>
  ) { }
  // 新增
  async add(question: QuestionEntity): Promise<QuestionEntity> {
    return await this.questionEntity.save(question)
  }
}