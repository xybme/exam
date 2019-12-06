import {Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany, Column} from "typeorm";
import { QuestionEntity } from '../question/question.entity'
@Entity('exam')
export class ExamEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 20, comment: '试卷名'})
  examName: string;

  @Column({type: 'varchar', length: 100, default: '', comment: '描述'})
  describe : string;

  @Column({ type: 'datetime', comment: '创建时间', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(type => QuestionEntity)
  @JoinTable()
  questions: QuestionEntity[];
}