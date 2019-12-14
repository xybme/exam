/**
 * Logging interceptor.
 * 日志拦截
 */

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/info.log' })
  ]
});
const isDevMode = true

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const call$ = next.handle();
    if (!isDevMode) {
      return call$;
    }
    const request = context.switchToHttp().getRequest();
    const content = request.method + ' -> ' + request.url;
    const now = Date.now();
    return call$.pipe(
      // 通过rxjs 管道进入下一个拦截器
      tap(() => {
        logger.log('info', { path: content, time: now })
      }),
    );
  }
}
