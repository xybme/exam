import { Controller, Post, Get, Query, Body } from "@nestjs/common";
import { filterPage } from '@/utils/filter.param'
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
  async queryFileList(@Query() param: any) {
    const { applicant, examId } = param
    let where = {}
    if (applicant) where['applicant'] = applicant
    if (examId) where['examId'] = examId
    const pageParam = filterPage(param)
    return await this.resultService.find({ pageParam, where })
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