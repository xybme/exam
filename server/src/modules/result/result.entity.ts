import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { entityDatePipe } from '@/utils/time.format'

@Entity('exam_result')
export class ResultEntity {

  @PrimaryGeneratedColumn({ comment: 'id' })
  resultId: number;

  @Column({ comment: '试卷ID' })
  examId: number;

  @Column({ type: 'varchar', length: 10, comment: '应聘人' })
  applicant: string;

  @Column({ type: 'varchar', nullable: true, length: 11, comment: '应聘人电话' })
  telephone: string;

  @Column({ comment: '期望薪资', nullable: true })
  salaryMin: number;

  @Column({ comment: '期望薪资', nullable: true })
  salaryMax: number;
  
  @Column({ type: 'varchar', nullable: true, comment: 'json保存答案 [{id:1,optionId:2},{id:1,text:这是输入的答案}]'})
  resultJson: string;

  @CreateDateColumn({ type: 'datetime', comment: '开始时间', transformer: entityDatePipe })
  startTime: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '结束时间', transformer: entityDatePipe })
  endTime: Date;
}