import { IsString } from 'class-validator';

export class CreateUserDto {
  readonly id: number;

  // Class validator is a library that provides different validation decorators that can be added on top of the class properties.
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;
}
