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
    console.log(question)
    const { options, questionType } = question
    // 输入项问题
    if (questionType === 3) {
      return await this.questionService.add(question)
    }
    // 选择题
    if (options.length < 2) {
      throw new HttpException(`选择题至少该有2个选项`, 200);
    }
    const optionRes = await this.optionService.add(options)
    question.options = optionRes
    return await this.questionService.add(question)
  }
}