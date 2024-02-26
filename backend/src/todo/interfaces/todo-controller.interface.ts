import { Todo } from '@prisma/client';
import { CreateTodoDto, UpdateTodoDto } from '../dto';

export interface ITodoController {
  create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo>;
  findAll(userId: string): Promise<Array<Todo>>;
  findOne(id: string): Promise<Todo | Record<string, unknown>>;
  update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo>;
  remove(id: string): Promise<{ isDeleted: boolean }>;
}
