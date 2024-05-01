/* eslint-disable prettier/prettier */
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  postalAddress?: string;
}
