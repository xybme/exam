
import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import * as moment from 'moment'
import * as winston from 'winston'

/**实例化日志 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
  ]
});
/**
 * 全局异常过滤器
 * 拦截全局抛出的所有异常， 规范化输出
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errMsg = exception.message;
    const message = (typeof errMsg === 'string') ? errMsg : errMsg.message;

    const request = ctx.getRequest();
    // 错误标准输出
    response.status(status).json({
      success: false,
      message
    });
    let params = ''
    if (request.method == 'POST') {
      params = JSON.stringify(request.body)
    }
    // 错误日志记录
    logger.error('error', {
      path: request.url,
      method: request.method,
      status,
      message,
      params,
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      ip: request.connection.remoteAddress
    })
  }
}
