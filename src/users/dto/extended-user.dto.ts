import { IsBoolean } from 'class-validator';
import { User } from '../entities/user.entity';

export class ExtendedUserDto extends User {
  @IsBoolean()
  readonly hasUnfinishedTodos: boolean;
}
