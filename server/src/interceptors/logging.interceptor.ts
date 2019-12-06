/**
 * Logging interceptor.
 * 日志拦截
 */

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
const isDevMode = true

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const call$ = next.handle();
    if (!isDevMode) {
      return call$;
    }
    const request = context.switchToHttp().getRequest();
    const content = request.method + ' -> ' + request.url + JSON.stringify(request.body);
    console.log('-----收到请求：', content);
    const now = Date.now();
    return call$.pipe(
      // 通过rxjs 管道进入下一个拦截器
      tap()
      // tap(() => console.log('--- 响应请求：', content, `${Date.now() - now}ms`)),
    );
  }
}
