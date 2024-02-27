import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ArgonService } from '../shared/services/argon/argon.service';
import { JsonWebTokenModule } from '../shared/services/jwt/json-web-token.module';
import { PrismaModule } from '../shared/services/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule, JsonWebTokenModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService, ArgonService],
})
export class UserModule {}
