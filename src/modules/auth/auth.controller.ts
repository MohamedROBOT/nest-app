import { Body, Controller, Param, Post, UsePipes } from '@nestjs/common';
import { SYS_MSG } from '../../common';
import { AuthService } from './auth.service';
import { loginSchema, type LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ZodValidationPipe } from '../../pipes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return {
      success: true,
      message: SYS_MSG.USER.CREATE_SUCCESS,
    };
  }
  @Post('login/:id')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);
    return {
      success: true,
      message: SYS_MSG.USER.LOGIN_SUCCESS,
      tokens,
    };
  }
}
