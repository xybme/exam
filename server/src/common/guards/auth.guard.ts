import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
const jwt = require('jsonwebtoken');

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      if (info instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException({statusCode: 401, message: 'token过期'});
      } else {
        throw err || new UnauthorizedException({statusCode: 401, message: '未通过token认证'});
      }
    }
    // user对象会添加到req中，控制器里可以使用req.user获取当前用户
    return user;
  }
}

