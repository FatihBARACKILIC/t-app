import { Module } from '@nestjs/common';
import { ArgonService } from 'src/shared/services/argon/argon.service';
import { JsonWebTokenModule } from 'src/shared/services/jwt/json-web-token.module';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JsonWebTokenModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, ArgonService],
})
export class AuthModule {}
