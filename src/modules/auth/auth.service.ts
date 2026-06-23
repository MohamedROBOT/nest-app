import { ConflictException, Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../models';
import { SYS_MSG } from '../../common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  //inject
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(registerDto: RegisterDto) {
    //inject user repository
    //check user existance
    const customerExist = await this.customerRepository.getOne({
      email: registerDto.email,
    });
    if (customerExist) throw new ConflictException(SYS_MSG.USER.ALREADY_EXIST);
    return await this.customerRepository.create(registerDto);

    //hash password
    //encrypt phone number
    //generate otp
    //save user and otp in redis
    //send otp to user
  }

  async login(loginDto: LoginDto) {
    //check user existance
    const userExist = await this.customerRepository.getOne({
      email: loginDto.email,
    });
    //compare password with the hashed password
    //throw error if any of the above fails
    if (!userExist) throw new ConflictException(`Invalid Credentials`);
    //generate access token and refresh token
    const payload = {
      sub: userExist._id,
      email: userExist.email,
      role: userExist.role,
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.jwtRefreshSecret'),
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
