import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { OptionEntity } from '../option/option.entity'

@Entity('exam_question')
export class QuestionEntity {

  @PrimaryGeneratedColumn({comment: '问题ID'})
  id: number;

  @Column({type: 'varchar', length: 50, comment: '题目'})
  questionName: string;

  @Column({type: 'smallint', default: 1, comment: '单选1 多选2 输入3'})
  questionType: number;

  @OneToMany(type => OptionEntity, option => option.question)
  options: OptionEntity[];

}