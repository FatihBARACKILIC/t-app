import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { JsonWebTokenService } from './json-web-token.service';

@Module({
  providers: [JsonWebTokenService, ConfigService, JwtService, PrismaService],
  exports: [JsonWebTokenService],
})
export class JsonWebTokenModule {}
