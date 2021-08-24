import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class ModifyUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsOptional()
  readonly zipcode?: number;

  @IsString()
  @IsOptional()
  readonly city?: string;

  @IsString()
  @IsOptional()
  readonly street?: string;
}
