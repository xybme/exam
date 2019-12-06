import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('exam_result')
export class ResultEntity {

  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ comment: '问卷ID' })
  surveyId: number;

  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ type: 'datetime', comment: '创建时间', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}