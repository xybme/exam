import { IsNotEmpty, IsNumber, IsNumberString, Length } from 'class-validator';

class BaseSurvey {
  describe: string;
  status: number;
}

export class CreateSurveyDto extends BaseSurvey {
  @IsNotEmpty()
  @Length(5, 20)
  surveyName: string;
}

export class UpdateSurveyDto extends BaseSurvey {
  @IsNumber()
  surveyId: number;

  surveyName: string;
}