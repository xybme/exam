import { Controller, Post, Get, HttpException, Body, ParseIntPipe, UseGuards, Query, Req } from '@nestjs/common'
import { ExamService } from './exam.service'
import { ExamEntity } from './exam.entity'
import { CreateExamDto } from './exam.dto'
import { QuestionService } from '../question/question.service'
import { JwtAuthGuard } from '../../guards/auth.guard'

@Controller('exam')
export class ExamControllor {
  constructor(
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
  ) { }
  /**
   * 列表
   */
  @Get('list')
  async list(): Promise<ExamEntity[]> {
    return await this.examService.findAll()
  }
  /**
   * 查一个
   */
  @Get('findById')
  async findById(@Query() param) {
    const { examId } = param
    if (!examId) {
      throw new HttpException(`缺少examId`, 200);
    }
    const attr = await this.examService.findOne(examId)
    const { questionIds } = attr
    const rows = await this.questionService.findByIds(questionIds.split(','))
    return { attr, rows }
  }
  /**
   * 增
   * @param survey 
   */
  @Post('add')
  async add(@Body() exam: CreateExamDto): Promise<ExamEntity> {
    return await this.examService.add(exam)
  }
}

