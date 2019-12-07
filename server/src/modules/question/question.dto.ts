import { IsNumber, Length, IsString } from 'class-validator';
import { OptionEntity } from '../option/option.entity'

export class CreateQuestionDto {
  @IsString()
  @Length(2, 50)
  questionName: string;

  @IsNumber()
  questionType: number;

  @IsNumber()
  positionId: number;
  
  id: number;
  options: OptionEntity[];
}
