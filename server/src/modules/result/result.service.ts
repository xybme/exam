import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultEntity } from './result.entity';
import { CreateResultDto } from './result.dto'
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
      order: { 'createTime': 'DESC' },
      skip: (pageParam.currentPage - 1) * pageParam.everyPage,
      take: pageParam.everyPage,
    })
    return {
      page: { totalRecords, ...pageParam },
      rows
    }
  }

  /**新增 */
  async add(result: CreateResultDto) {
    return await this.resultEntity.save(result)
  }
}