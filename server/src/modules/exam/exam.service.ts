import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamEntity } from './exam.entity';
import { CreateExamDto } from './exam.dto'

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examEntity: Repository<ExamEntity>
  ) { }

  async findAll(): Promise<ExamEntity[]> {
    return await this.examEntity.find()
  }

  async add(exam: CreateExamDto): Promise<ExamEntity> {
    return await this.examEntity.save(exam)
  }

  async update(exam: ExamEntity): Promise<Boolean> {
    await this.examEntity.update(exam.examId, exam)
    return true
  }
  
  async findOne(examId: number): Promise<ExamEntity> {
    let res = await this.examEntity.findOne({
      where: { examId }
    });
    // 没查到返回undefined
    if (res) return res
    throw new HttpException(`无此Id`, 200);
  }
}
