import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { QuestionEntity } from '../question/question.entity'
/**
 * 职位类型
 */
@Entity('exam_position')
export class PositionEntity {

  @PrimaryGeneratedColumn()
  positionId: number;

  @Column({type: 'varchar', length: 20, comment: '职位名称'})
  positionName: string;

}