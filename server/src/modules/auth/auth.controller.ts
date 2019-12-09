import { Controller, Get, UseGuards, Post, Res, HttpException, Body } from '@nestjs/common';
import { Response } from 'express'
import { Length, IsString, IsMobilePhone } from 'class-validator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/auth.guard'

class AccountDto {
  @IsMobilePhone('zh-CN')
  telephone: string;

  @IsString()
  @Length(6, 20)
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  // 登录 在头部返回token
  @Post('login')
  async login(@Body() account: AccountDto, @Res() res:Response): Promise<any> {
    if (!['18398101098'].includes(account.telephone)){
      throw new HttpException(`手机号错误`, 200);
    }
    if (!['123456'].includes(account.password)){
      throw new HttpException(`密码错误`, 200);
    }
    let tokenObj = await this.authService.createToken(account.telephone);
    res.setHeader('token', tokenObj.accessToken)
    res.send({
      success: true,
      message: '登录成功',
      attr: tokenObj
    })
  }

  // 验证token是否失效
  @Get('validate')
  @UseGuards(JwtAuthGuard)
  validate() {
    return {message: 'token有效'}
  }
}
