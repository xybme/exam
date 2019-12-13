import { Controller, Post, Get, Query, UseGuards, Body } from "@nestjs/common";
import { JwtAuthGuard } from '@/guards/auth.guard'
import { ListParams, IParamsResult } from '@/decorator/list-params.decorator'
import { ResultService } from './result.service'
import { CreateResultDto, UpdateResultDto } from './result.dto'
/**
 * result 控制器
 */
@Controller('result')
export class ResultControllor {
  constructor(
    private readonly resultService: ResultService
  ) { }

  /**查询列表 分页+条件查询 */
  @Get('list')
  @UseGuards(JwtAuthGuard)
  async queryFileList(@ListParams({
    whereOptions: ['applicant', 'telephone'],
    orderOptions: ['startTime'],
    defaultOrder: { 'startTime': 'DESC' }
  }) params: IParamsResult) {
    return await this.resultService.find(params)
  }

  /**新增 开始答卷 插入应聘者信息 */
  @Post('add')
  async add(@Body() result: CreateResultDto) {
    return await this.resultService.add(result)
  }

  /**更新 完成试卷 插入答案 */
  @Post('update')
  async update(@Body() result: UpdateResultDto) {
    return await this.resultService.update(result)
  }
}