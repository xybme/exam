import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultEntity } from './result.entity';
import { CreateResultDto, UpdateResultDto } from './result.dto'
/**
 * result 服务
 */
@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(ResultEntity)
    private readonly resultEntity: Repository<ResultEntity>
  ) { }

  /**查询列表 分页 */
  async find({ pageParam, where }) {
    const [rows, totalRecords] = await this.resultEntity.findAndCount({
      where,
      order: { 'startTime': 'DESC' },
      skip: (pageParam.currentPage - 1) * pageParam.everyPage,
      take: pageParam.everyPage,
    })
    return {
      page: { totalRecords, ...pageParam },
      rows
    }
  }

  /**新增 开始答卷 */
  async add(result: CreateResultDto) {
    return await this.resultEntity.save(result)
  }

  /**更新 完成答卷 */
  async update(result: UpdateResultDto) {
    return await this.resultEntity.update(result.resultId, result)
  }

  /**查询examId的插入条数 */
  async findByExamId(examId: number) {
    return await this.resultEntity.count({ where: { examId } })
  }
}