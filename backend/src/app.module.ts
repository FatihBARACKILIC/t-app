import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './shared/config/configuration';
import { ArgonService } from './shared/services/argon/argon.service';
import { JsonWebTokenModule } from './shared/services/jwt/json-web-token.module';
import { PrismaService } from './shared/services/prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    JsonWebTokenModule,
    UserModule,
  ],
  controllers: [],
  providers: [PrismaService, ArgonService, ArgonService],
})
export class AppModule {}
