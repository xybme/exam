import { Controller, Post, HttpException, Body } from "@nestjs/common";
import { OptionService } from './option.service';
import { OptionEntity } from './option.entity';
/**
 * option 控制器
 */
@Controller('option')
export class OptionControllor {
  constructor(
    private readonly optionService: OptionService
  ) {}

  @Post('add')
  async add(@Body() option: OptionEntity[]) {
    return await this.optionService.add(option)
  }
  @Post('count')
  async count(@Body() param) {
    const { surveyId, telephone, optionIds} = param
    if (!surveyId) {
      throw new HttpException(`缺少问卷Id`, 200);
    }
    if (!telephone) {
      throw new HttpException(`缺少用户`, 200);
    }
    this.optionService.addCount(optionIds)
    return '成功'
  }
}