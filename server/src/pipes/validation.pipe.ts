import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PipeTransform, Injectable, HttpException, ArgumentMetadata } from '@nestjs/common';
/**
 * 参数验证管道，在到达控制器前触发，return处理后的数据给控制器 或 抛出异常
 * @value ：前端传来的数据，
 * @metatype ：后端使用 class-validator定义的Dto类
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {

  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints).join(';')).join(';');
      throw new HttpException(errorMessage, 200); // 这里抛出异常给error.filter
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
