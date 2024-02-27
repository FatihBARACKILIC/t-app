import { Module } from '@nestjs/common';
import { JsonWebTokenModule } from '../shared/services/jwt/json-web-token.module';
import { PrismaService } from '../shared/services/prisma/prisma.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [JsonWebTokenModule],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule {}
