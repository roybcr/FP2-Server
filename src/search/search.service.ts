import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { ExtendedUserDto } from '../users/dto/extended-user.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async searchUsers(query: string): Promise<ExtendedUserDto[]> {
    const users = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.todos', 'todos')
      .leftJoinAndSelect('user.posts', 'posts')
      .where(`name ILike '${query}%' OR email ILike '${query}%'`)
      .getMany();

    const extendedUsers: ExtendedUserDto[] = users.map((u) => {
      const hasUnfinishedTodos = u.todos.filter((t) => !t.completed).length > 0;
      return { ...u, hasUnfinishedTodos };
    });
    return extendedUsers;
  }
}
