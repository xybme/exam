import { Controller, Get, Query, Post, Body, UseGuards, HttpException } from "@nestjs/common";
import { ListParams, IParamsResult } from '@/common/decorator/list-params.decorator'
import { JwtAuthGuard } from '@/common/guards/auth.guard'
import { QuestionService } from "./question.service";
import { OptionService } from '../option/option.service'
import { CreateQuestionDto } from './question.dto'

@Controller('question')
@UseGuards(JwtAuthGuard)
export class QuestionControllor {
  constructor(
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService,
  ) { }

  /**新建问题，先存选项，再存问题 */
  @Post('add')
  async add(@Body() question: CreateQuestionDto) {
    const { options, questionType } = question
    // 输入项问题
    if (questionType === 3) {
      return await this.questionService.add(question)
    }
    // 选择题
    if (!Array.isArray(options) || options.length < 2) {
      throw new HttpException(`选择题至少该有2个选项`, 200);
    }
    const optionRes = await this.optionService.add(options)
    question.options = optionRes
    return await this.questionService.add(question)
  }

  /**查询问题列表 分页+条件查询 */
  @Get('list')
  async queryFileList(@ListParams({
    // 条件查询字段
    whereOptions: ['positionId', 'questionType'],
    // 默认排序
    defaultOrder: { 'createTime': 'DESC' }
  }) params: IParamsResult) {
    return await this.questionService.find(params)
  }

  @Get('queryByIds')
  async queryByIds(@Query('questionIds') questionIds: string) {
    return await this.questionService.findByIds(questionIds.split(','))
  }
}