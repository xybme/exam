import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamEntity } from './exam.entity';
import { filterParam } from '../../utils/filter.param'
import { CreateSurveyDto, UpdateSurveyDto } from './exam.dto'

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly ExamEntity: Repository<ExamEntity>
  ) { }
  // 查询
  async find(param): Promise<ExamEntity[]> {
    console.log(`survey服务`)
    return await this.ExamEntity.find({
      where: filterParam(param, ['surveyId', 'surveyName', 'status'])
    });
  }
  // 新增
  async add(survey: CreateSurveyDto): Promise<ExamEntity> {
    return await this.ExamEntity.save(survey)
  }
  // 更新
  async update(survey: UpdateSurveyDto): Promise<Boolean> {
    await this.ExamEntity.update(survey.surveyId, survey)
    return true
  }
  // 查询一个
  async findOne(surveyId: number): Promise<ExamEntity> {
    let survey = await this.ExamEntity.findOne({
      relations: ['questions', 'questions.options'],
      where: { surveyId }
    });
    // 没查到返回undefined
    if (survey) return survey
    throw new HttpException(`无此Id`, 200);
  }
}
