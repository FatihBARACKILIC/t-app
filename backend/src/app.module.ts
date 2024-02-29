import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './shared/config/configuration';
import { ArgonService } from './shared/services/argon/argon.service';
import { JsonWebTokenModule } from './shared/services/jwt/json-web-token.module';
import { PrismaModule } from './shared/services/prisma/prisma.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    JsonWebTokenModule,
    UserModule,
    TodoModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, ArgonService, ArgonService],
})
export class AppModule {}
