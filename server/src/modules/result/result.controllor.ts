import { Controller, Post, Get, Query, ParseIntPipe, UseGuards, Body } from "@nestjs/common";
import { JwtAuthGuard } from '@/common/guards/auth.guard'
import { ListParams, IParamsResult } from '@/common/decorator/list-params.decorator'
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
    defaultOrder: { 'startTime': 'DESC' }
  }) params: IParamsResult) {
    return await this.resultService.find(params)
  }

  /**查询指定Id */
  @Get('findById')
  async findById(@Query('resultId', new ParseIntPipe()) resultId: number) {
    return await this.resultService.findOne(resultId)
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