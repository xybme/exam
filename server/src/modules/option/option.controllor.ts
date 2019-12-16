import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { JwtAuthGuard } from '@/common/guards/auth.guard'
import { OptionService } from './option.service';
import { OptionEntity } from './option.entity';
/**
 * option 控制器
 */
@Controller('option')
@UseGuards(JwtAuthGuard)
export class OptionControllor {
  constructor(
    private readonly optionService: OptionService
  ) {}

  @Post('add')
  async add(@Body() option: OptionEntity[]) {
    return await this.optionService.add(option)
  }
}