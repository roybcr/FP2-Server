import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async searchUsers(query: string): Promise<User[]> {
    const users = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.todos', 'todos')
      .leftJoinAndSelect('user.posts', 'posts')
      .where(`name ILike '${query}%' OR email ILike '${query}%'`)
      .getMany();

    return users;
  }
}
