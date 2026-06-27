import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CustomerDocument, CustomerRepository } from '../../models';
import { generateOtp, SYS_MSG } from '../../common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from './dto';
import { MailService } from '../../shared/mail/mail.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { VerifyAccountDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
  //inject
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  async register(registerDto: RegisterDto) {
    //inject user repository
    //check user existance
    const customerExist = await this.customerRepository.getOne({
      email: registerDto.email,
    });
    if (customerExist) throw new ConflictException(SYS_MSG.USER.ALREADY_EXIST);

    //hash password
    //encrypt phone number
    const otp = generateOtp();
    //save user and otp in redis
    await this.cacheManager.set(`OTP:${registerDto.email}`, otp);
    await this.cacheManager.set(registerDto.email, registerDto);
    //send otp to user
    await this.mailService.send({
      to: registerDto.email,
      subject: 'OTP Verification',
      html: `<p> Your OTP is ${otp}</p>`,
    });
  }
  async verify(verifyAccountDto: VerifyAccountDto) {
    const otp = await this.cacheManager.get(`OTP:${verifyAccountDto.email}`);
    if (!otp || otp !== verifyAccountDto.otp)
      throw new BadRequestException('Invalid OTP');
    const cachedUser = await this.cacheManager.get(verifyAccountDto.email);
    if (!cachedUser) throw new BadRequestException(SYS_MSG.USER.NOT_FOUND);
    const user = await this.customerRepository.create(cachedUser);
    if (!user) throw new BadRequestException(SYS_MSG.USER.CREATE_FAILED);
    await this.cacheManager.del(`OTP:${verifyAccountDto.email}`);
    await this.cacheManager.del(verifyAccountDto.email);
    return user;
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
