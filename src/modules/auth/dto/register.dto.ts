import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  username: string;
  @IsStrongPassword()
  password: string;
  @IsString()
  repassword: string;
  @IsPhoneNumber()
  phoneNumber: string;
}
