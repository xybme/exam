import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { entityDatePipe } from '@/utils/time.format'
@Entity('exam')
export class ExamEntity {

  @PrimaryGeneratedColumn()
  examId: number;

  @Column({type: 'varchar', length: 20, comment: '试卷名'})
  examName: string;

  @Column({type: 'varchar', length: 100, default: '', comment: '描述'})
  describe : string;

  @Column({type: 'varchar', length: 20, comment: '问题集合，逗号分割'})
  questionIds: string;

  @Column({ type: 'varchar', length: 20, default: '', comment: '创建人'})
  createBy: string;

  @Column({ type: 'datetime', comment: '创建时间', default: () => 'CURRENT_TIMESTAMP', transformer: entityDatePipe })
  createTime: Date;

}