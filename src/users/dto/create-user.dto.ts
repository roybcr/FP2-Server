import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  readonly id: number;

  // Class validator is a library that provides different validation decorators that can be added on top of the class properties.
  @IsString()
  @IsDefined()
  readonly name: string;

  @IsEmail(undefined, { message: 'Email is not valid!' })
  readonly email: string;
}
