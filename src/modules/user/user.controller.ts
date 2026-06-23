import { Controller, Get, UseGuards } from '@nestjs/common';
import { SYS_MSG } from '../../common';
import { User } from '../../decorators';
import { AuthGuard } from '../../guards';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getProfile(@User() payload: any) {
    const userData = await this.userService.getProfile(payload.sub);
    return {
      success: true,
      message: SYS_MSG.USER.FOUND_SUCCESS,
      data: userData,
    };
  }
}
