import { Body, Controller, Post } from '@nestjs/common';
import { SYS_MSG } from '../../common';
import { Public } from '../../decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyAccountDto } from './dto/verify.dto';
@Controller('auth')
@Public(true)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return {
      success: true,
      message: SYS_MSG.OTP.SEND_SUCCESS,
    };
  }
  @Post('verify')
  async verify(@Body() verifyAccountDto: VerifyAccountDto) {
    const user = await this.authService.verify(verifyAccountDto);
    return {
      success: true,
      message: SYS_MSG.USER.CREATE_SUCCESS,
      user,
    };
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);
    return {
      success: true,
      message: SYS_MSG.USER.LOGIN_SUCCESS,
      tokens,
    };
  }
}
