import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class ModifyUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  readonly zipcode: string;

  @IsString()
  @IsOptional()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly street: string;
}
