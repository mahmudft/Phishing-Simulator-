import { IsString, IsInt, Min, Max, IsNotEmpty, IsEmail } from 'class-validator';


export class CreatePhishingDto {
  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsNotEmpty()
  @IsEmail()
  readonly recipient: string;

  @IsString()
  @IsNotEmpty()
  readonly userID: string;

}