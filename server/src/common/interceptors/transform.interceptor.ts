import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as lodash from 'lodash';
import { map } from 'rxjs/operators';
/**返回结构 分页多一个page对象 */
let response = {
  message: '',
  success: true,
  attr: {},
  rows: []
}
/**
 * 返回数据转换.拦截器
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('-----input transform拦截-----')
    return next.handle().pipe(map((data: any) => {
      // console.log('------output transform拦截-------')
      // rxjs 管道 处理数据再统一返回 进入下一个拦截器或返回前端
      if (lodash.isArray(data)) {
        return Object.assign(response, { rows: data })
      }
      if (lodash.isObject(data)) {
        if (data.hasOwnProperty('attr') || data.hasOwnProperty('rows')) {
          return Object.assign(response, data)
        }
        return Object.assign(response, { attr: data })
      }
      if (lodash.isString(data)) {
        return Object.assign(response, { message: data })
      }
    }));
  }
}