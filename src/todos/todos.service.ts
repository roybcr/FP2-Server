import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createTodo(
    userId: string,
    createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    const user = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Cannot create a todo for non-existing user!`,
      );
    }

    const todo = this.todoRepository.create({
      userId: +userId,
      ...createTodoDto,
    });
    return await this.todoRepository.save(todo);
  }

  async hasUncompleteTodos(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: +userId },
      relations: ['todos'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID #${userId} does not exist!`);
    }
    if (user.todos.length > 0) {
      const unfinishedTodos = user.todos.filter((todo) => !todo.completed);
      return unfinishedTodos.length > 0;
    }

    return true;
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.preload({
      id: +id,
      completed: updateTodoDto.completed,
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID #${id} does not exist!`);
    }
    return await this.todoRepository.save(todo);
  }
}
