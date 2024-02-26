import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TodoPriority } from '../enums';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TodoPriority)
  @IsOptional()
  priority?: TodoPriority;
}
