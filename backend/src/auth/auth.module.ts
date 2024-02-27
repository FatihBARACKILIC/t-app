import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/services/prisma/prisma.module';
import { ArgonService } from './../shared/services/argon/argon.service';
import { JsonWebTokenModule } from './../shared/services/jwt/json-web-token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JsonWebTokenModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, ArgonService],
})
export class AuthModule {}
