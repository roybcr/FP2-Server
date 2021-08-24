import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post(':userId')
  createTodo(
    @Param('userId') userId: string,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todosService.createTodo(userId, createTodoDto);
  }

  @Get(':userId')
  hasUncompletedTodos(@Param('userId') userId: string): Promise<boolean> {
    return this.todosService.hasUncompleteTodos(userId);
  }
}
