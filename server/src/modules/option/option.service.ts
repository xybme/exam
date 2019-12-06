import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OptionEntity } from './option.entity';
/**
 * option 服务
 */
@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private readonly optionEntity: Repository<OptionEntity>
  ) { }
  // 新增
  async add(options: OptionEntity[]) {
    return await this.optionEntity.save(options)
  }
}