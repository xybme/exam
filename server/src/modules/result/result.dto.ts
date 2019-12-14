import { IsNumber, Length, IsMobilePhone, IsString, IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateResultDto {
  @IsNumber()
  examId: number;

  @IsString()
  @Length(2, 6)
  applicant: string;

  @IsMobilePhone('zh-CN')
  telephone: string;

  resultJson: string
}

export class UpdateResultDto {
  @IsNumber()
  resultId: number;

  @IsString({message: 'resultJson字段先JSON.stringify再提交'})
  resultJson: string
}
