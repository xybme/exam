import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { QuestionEntity } from '../question/question.entity'
/**
 * 选项表
 */
@Entity('exam_option')
export class OptionEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '选项值' })
  optionName: string;

  @Column({type: 'smallint', default: 0, comment: '0错误 1正确'})
  isRight: number;

  @ManyToOne(type => QuestionEntity, question => question.options)
  question: QuestionEntity;
}