import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/error.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { ValidationPipe } from './pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许跨域
  app.enableCors();
  // 项目前缀
  app.setGlobalPrefix('exam');
  // 拦截器会触发2次 input和ouput都触发，多个拦截器遵循先进后出
  app.useGlobalInterceptors(
    // 数据转换拦截器
    new TransformInterceptor(),
    // 日志拦截器
    new LoggingInterceptor()
  );
  // 全局 验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局 异常响应过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log('服务已启动 端口：3000')
});
