import { Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { Todo } from '@prisma/client';
import { ITodoService } from './interfaces';

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const todo = await this.prisma.todo.create({
      data: { ...createTodoDto, userId },
    });
    return todo;
  }

  async findAll(userId: string): Promise<Array<Todo>> {
    const todoList = await this.prisma.todo.findMany({ where: { userId } });
    return todoList;
  }

  async findOne(id: string): Promise<Todo | Record<string, unknown>> {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    return todo ?? {};
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = this.prisma.todo.update({
      where: { id },
      data: { ...updateTodoDto },
    });
    return todo;
  }

  async remove(id: string): Promise<{ isDeleted: boolean }> {
    const todo = await this.prisma.todo.delete({ where: { id } });
    if (!todo) return { isDeleted: false };
    return { isDeleted: true };
  }
}
