import { Controller, Post, HttpException, Body, Get } from "@nestjs/common";
import { PositionEntity } from './position.entity';
import { PositionService } from './position.service';
/**
 * postion 控制器
 */
@Controller('position')
export class PositonControllor {
  constructor(
    private readonly positionService: PositionService
  ) { }
  /**查询所有 */
  @Get('queryAll')
  async queryAll() {
    return await this.positionService.findAll()
  }

  /**增 */
  @Post('add')
  async add(@Body() position: PositionEntity) {
    if (!position.positionName) {
      throw new HttpException(`职位名称必传`, 200);
    }
    return await this.positionService.add(position)
  }

  /**改 */
  @Post('update')
  async update(@Body() position: PositionEntity): Promise<String> {
    if (!position.positionName || !position.positionId) {
      throw new HttpException(`缺少字段`, 200);
    }
    await this.positionService.update(position)
    return '更新成功'
  }
}