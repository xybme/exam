import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PositionEntity } from './position.entity';
/**
 * option 服务
 */
@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private readonly positionEntity: Repository<PositionEntity>
  ) { }

  /**新增 */
  async add(position: PositionEntity) {
    return await this.positionEntity.save(position)
  }

  /**查询所有 */
  async findAll() {
    return await this.positionEntity.find()
  }

  /**更新 */
  async update(position: PositionEntity): Promise<Boolean> {
    await this.positionEntity.update(position.positionId, position)
    return true
  }
}