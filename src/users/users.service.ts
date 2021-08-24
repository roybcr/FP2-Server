import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ModifyUserDto } from './dto/modify-user.dto';
import { User } from './entities/user.entity';
import { ExtendedUserDto } from './dto/extended-user.dto';
import { plainToClass } from 'class-transformer';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async getAllUsers(): Promise<ExtendedUserDto[]> {
    // The "relations" here will fetch the related columns from posts and todos, based on each user's ID.
    const users = await this.userRepository.find({
      relations: ['posts', 'todos'],
    });

    const extendedUsers: ExtendedUserDto[] = users.map((u) => {
      const hasUncompleteTodos = u.todos.filter((t) => !t.completed).length > 0;
      return plainToClass(ExtendedUserDto, { ...u, hasUncompleteTodos });
    });

    return extendedUsers;
  }
  async searchUsers(query: string): Promise<User[]> {
    const users = await this.connection.getRepository(User).find({
      where: { name: ILike(`%${query}%`), email: ILike(`%${query}%`) },
      relations: ['posts', 'todos'],
    });

    return users;
  }
  async getOneUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: +id },
      relations: ['posts', 'todos'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} does not exist!`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({ ...createUserDto });
    return await this.userRepository.save(user);
  }

  async modifyUser(id: string, modifyUserDto: ModifyUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id: +id,
      ...modifyUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID #${id} does not exist!`);
    }
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: +id } });
    if (!user) {
      return false;
    }
    await this.userRepository.remove(user);
    return true;
  }
}
