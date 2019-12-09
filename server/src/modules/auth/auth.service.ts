import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  // 生成token 
  async createToken(telephone) {
    const user: JwtPayload = { telephone, name: '范文' };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 60 * 30, // 单位是秒
      accessToken,
    };
  }
  // 获取token后去查有没有这个用户 最好还是不查数据库
  async validateUser(payload: JwtPayload): Promise<JwtPayload> {
    // put some validation logic here
    // for example query user by id/email/username
    return payload
  }
}
