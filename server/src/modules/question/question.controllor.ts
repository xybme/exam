import { Controller, Post, Body, HttpException } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionEntity } from "./question.entity";
import { OptionService } from '../option/option.service'

@Controller('question')
export class QuestionControllor {
  constructor(
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService,
  ) { }

  @Post('add')
  async add(@Body() question: QuestionEntity) {
    if (!question.surveyId) {
      throw new HttpException(`缺少问卷Id`, 200);
    }
    let options = question.options
    // delete question['options']
    const qRes = await this.questionService.add(question)
    let { questionId } = qRes
    options.map(item => {
      item['questionId'] = questionId
    })
    await this.optionService.add(options)
    return { attr: { questionId }, message: '新增成功' }
  }
}