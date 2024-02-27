import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Todo } from '@prisma/client';
import { GetUser } from '../auth/decorators';
import { AccessGuard } from '../auth/guards';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';
import { ITodoController } from './interfaces';
import { TodoAuthorizationGuard } from './guards/todo-authorization.guard';

@Controller('todo')
@UseGuards(AccessGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class TodoController implements ITodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser('id') userId: string,
  ): Promise<Todo> {
    return await this.todoService.create(createTodoDto, userId);
  }

  @Get()
  async findAll(@GetUser('id') userId: string): Promise<Array<Todo>> {
    return await this.todoService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(TodoAuthorizationGuard)
  async findOne(
    @Param('id') id: string,
  ): Promise<Todo | Record<string, unknown>> {
    return await this.todoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TodoAuthorizationGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(TodoAuthorizationGuard)
  async remove(@Param('id') id: string): Promise<{ isDeleted: boolean }> {
    return await this.todoService.remove(id);
  }
}
