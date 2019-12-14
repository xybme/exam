import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IParamsResult } from '@/decorator/list-params.decorator'
import { QuestionEntity } from './question.entity';
import { CreateQuestionDto } from './question.dto'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionEntity: Repository<QuestionEntity>
  ) { }

  /**查询列表 分页 */
  async find({ pageParams, where, order }: IParamsResult) {
    const [rows, totalRecords] = await this.questionEntity.findAndCount({
      where,
      order,
      relations: ['options'],
      skip: (pageParams.currentPage - 1) * pageParams.everyPage,
      take: pageParams.everyPage,
    })
    return {
      page: { totalRecords, ...pageParams },
      rows
    }
  }

  /**查询一组问题包括他们的选项 */
  async findByIds(ids: any[]) {
    return await this.questionEntity.findByIds(ids, {
      relations: ['options'],
    })
  }

  /**新增 */
  async add(question: CreateQuestionDto) {
    return await this.questionEntity.save(question)
  }
}