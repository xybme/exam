import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IParamsResult } from '@/decorator/list-params.decorator'
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
  async find({ pageParams, where, order }: IParamsResult) {
    const [rows, totalRecords] = await this.resultEntity.findAndCount({
      where,
      order,
      skip: (pageParams.currentPage - 1) * pageParams.everyPage,
      take: pageParams.everyPage,
    })
    return {
      page: { totalRecords, ...pageParams },
      rows
    }
  }
  async findOne(resultId: number): Promise<ResultEntity> {
    return await this.resultEntity.findOne({
      where: { resultId }
    });
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