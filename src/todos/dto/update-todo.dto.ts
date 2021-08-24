import { IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  readonly id: number;
  @IsBoolean()
  readonly completed: boolean;
}
