import { Controller, Post, Get, HttpException, Body, ParseIntPipe, UseGuards, Query, Req } from '@nestjs/common'
import { ExamService } from './exam.service'
import { ExamEntity } from './exam.entity'
import { CreateSurveyDto, UpdateSurveyDto } from './exam.dto'
import { JwtAuthGuard } from '../../guards/auth.guard'

@Controller('survey')
export class ExamControllor {
  constructor(private readonly ExamService: ExamService) { }
  // 查
  @Get('query')
  @UseGuards(JwtAuthGuard)
  async query(@Query() param: any, @Req() req): Promise<ExamEntity[]> {
    console.log(req.user)
    return await this.ExamService.find(param)
  }
  // 查单个 联表
  @Get('queryDetail')
  async queryDetail(@Query('surveyId', new ParseIntPipe()) surveyId: number): Promise<ExamEntity> {
    return await this.ExamService.findOne(surveyId)
  }
  // 增
  @Post('add')
  async add(@Body() survey: CreateSurveyDto): Promise<ExamEntity> {
    return await this.ExamService.add(survey)
  }
  // 改
  @Post('update')
  async update(@Body() survey: UpdateSurveyDto): Promise<String> {
    await this.ExamService.update(survey)
    return '更新成功'
  }
}

