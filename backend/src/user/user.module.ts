import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { JsonWebTokenModule } from 'src/shared/services/jwt/json-web-token.module';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ArgonService } from 'src/shared/services/argon/argon.service';

@Module({
  imports: [AuthModule, JsonWebTokenModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, ArgonService],
})
export class UserModule {}
