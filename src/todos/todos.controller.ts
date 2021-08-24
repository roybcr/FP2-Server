import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

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

  @Patch(':id')
  modify(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.updateTodo(id, updateTodoDto);
  }
}
