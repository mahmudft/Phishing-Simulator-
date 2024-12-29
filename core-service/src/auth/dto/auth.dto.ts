import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// management-service/src/auth/dto/login.dto.ts
export class LoginDto {
  @IsEmail()
  email: string;

  

  @IsString()
  password: string;
}