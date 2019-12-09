import { Controller, Post, Get, HttpException, Body, ParseIntPipe, UseGuards, Query, Req } from '@nestjs/common'
import { ExamService } from './exam.service'
import { ExamEntity } from './exam.entity'
import { CreateExamDto } from './exam.dto'
import { QuestionService } from '../question/question.service'
import { ResultService } from '../result/result.service'
import { JwtAuthGuard } from '../../guards/auth.guard'

@Controller('exam')
export class ExamControllor {
  constructor(
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
    private readonly resultService: ResultService,
  ) { }

  @Get('list')
  async list(): Promise<ExamEntity[]> {
    return await this.examService.findAll()
  }

  @Get('findById')
  async findById(@Query('examId', new ParseIntPipe()) examId: number) {
    const attr = await this.examService.findOne(examId)
    const { questionIds } = attr
    const rows = await this.questionService.findByIds(questionIds.split(','))
    return { attr, rows }
  }

  @Post('add')
  async add(@Body() exam: CreateExamDto): Promise<ExamEntity> {
    return await this.examService.add(exam)
  }

  @Post('update')
  async update(@Body() exam: ExamEntity): Promise<Boolean> {
    if (!exam.examId) {
      throw new HttpException(`缺少examId`, 200);
    }
    const resultCount = await this.resultService.findByExamId(exam.examId)
    if (resultCount > 0) {
      throw new HttpException(`此试卷已存在答题记录，不可修改`, 200);
    }
    await this.examService.update(exam)
    return true
  }
}

