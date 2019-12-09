import { Controller, Post, Get, Query, Body } from "@nestjs/common";
import { filterPage } from '@/utils/filter.param'
import { ResultService } from './result.service'
import { CreateResultDto } from './result.dto'
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
  async queryFileList(@Query() param: any) {
    const { applicant, examId } = param
    let where = {}
    if (applicant) where['applicant'] = applicant
    if (examId) where['examId'] = examId
    const pageParam = filterPage(param)
    return await this.resultService.find({ pageParam, where })
  }

  /**新增 */
  @Post('add')
  async add(@Body() result: CreateResultDto) {
    return await this.resultService.add(result)
  }
}