/**
 * 全局异常过滤器
 * 拦截全局抛出的所有异常， 规范化输出
 */
import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errMsg = exception.message;
    const message = (typeof errMsg === 'string') ? errMsg : errMsg.message;
    
    const request = ctx.getRequest();
    const timestamp = new Date().toISOString();
    console.warn(`api:${request.url}---errMsg:${message}---at:${timestamp}`);
    response
      .status(status)
      .json({
        success: false,
        message
      });
  }
}
