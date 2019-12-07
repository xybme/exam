import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { CreateQuestionDto } from './question.dto'


@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionEntity: Repository<QuestionEntity>
  ) { }

  /**查询列表 分页 */
  async find({ pageParam, where }) {
    const [rows, totalRecords] = await this.questionEntity.findAndCount({
      where,
      order: { 'createTime': 'DESC' },
      skip: (pageParam.currentPage - 1) * pageParam.everyPage,
      take: pageParam.everyPage,
    })
    return {
      page: { totalRecords, ...pageParam },
      rows
    }
  }
 
  /**查询一组问题包括他们的选项 */
  async findByIds(ids: any[]) {
    return this.questionEntity.findByIds(ids, {
      relations: ['options'],
    })
  }
  
  /**新增 */
  async add(question: CreateQuestionDto): Promise<QuestionEntity> {
    return await this.questionEntity.save(question)
  }
}