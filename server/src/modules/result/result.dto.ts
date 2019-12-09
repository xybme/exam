import { IsNumber, Length, IsMobilePhone, IsString, IsEmpty } from 'class-validator';

export class CreateResultDto {

  @IsNumber()
  examId: number;

  @IsString()
  @Length(2, 6)
  applicant: string;

  @IsMobilePhone('zh-CN')
  telephone: string;

  @IsEmpty()
  resultJson: string

}
