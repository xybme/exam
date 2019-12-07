import { IsNotEmpty, Length, IsString } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty()
  @Length(2, 20)
  examName: string;

  @IsNotEmpty()
  @IsString()
  questionIds: string;
}
