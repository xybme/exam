import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
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
  
  @Column({ type: 'varchar', comment: 'json保存答案 [{id:1,optionId:2},{id:1,text:这是输入的答案}]'})
  resultJson: string;

  @Column({ type: 'datetime', comment: '创建时间', default: () => 'CURRENT_TIMESTAMP', transformer: entityDatePipe })
  createTime: Date;
}