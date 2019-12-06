import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    /**
     * 向父类传递授权的必要参数，
     * jwtFromRequest: 传递&获取token的方式,有很多种，可在源码中查看
     * 例如：fromAuthHeaderAsBearerToken()
     *      fromBodyField('access_token')
     */
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'), // 只能接收小写的
      secretOrKey: 'secretKey',
    });
  }
  /**
   * validate 方法实现了父类的抽象方法，在解密授权令牌成功后，即本次请求的token是没过期的
   * 此时解密后的payload做完参数传递给validate方法，然后验证用户
   * 当用户不存在时，抛出UnauthorizedException
   * 当用户存在时，会将user对象添加到req中，在之后的req对象中，可以使用req.user获取当前登录用户
   */
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException('请登录后查询');
    }
    return user;
  }
}
