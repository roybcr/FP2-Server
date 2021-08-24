import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  readonly id: number;

  @IsString()
  readonly title: string;

  @IsBoolean()
  readonly completed = false;
}
