import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ModifyUserDto } from './dto/modify-user.dto';

// Specifying 'users' will assign a devoted endpoint /users to this specific controller.
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.getOneUser(id);
  }

  @Get()
  search(@Query('query') query: string) {
    return this.usersService.searchUsers(query);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  modify(@Param('id') id: string, @Body() modifyUserDto: ModifyUserDto) {
    return this.usersService.modifyUser(id, modifyUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
