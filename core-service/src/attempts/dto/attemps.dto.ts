import { IsEmail, IsNumber, IsString, IsUUID } from "class-validator";

export class AttempsDto {
  @IsString()
  userID: string;

  @IsString()
  body: string;

  @IsEmail()
  recipient: string;

  @IsEmail()
  status: boolean;

  @IsNumber()
  clickCount: number;

  @IsUUID()
  linkID: string;
}

