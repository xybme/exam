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
}