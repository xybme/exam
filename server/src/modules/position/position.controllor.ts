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
  /**
   * 查询所有职位配置
   */
  @Get('queryAll')
  async queryAll() {
    return await this.positionService.findAll()
  }

  /**
   * 
   * @param positon 新增职位
   */
  @Post('add')
  async add(@Body() positon: PositionEntity) {
    console.log(positon)
    return await this.positionService.add(positon)
  }
  /**
   * 改
   * @param position 
   */
  @Post('update')
  async update(@Body() position: PositionEntity): Promise<String> {
    await this.positionService.update(position)
    return '更新成功'
  }
}