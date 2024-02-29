import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { corsOptions } from './shared/options/cors.options';
import { helmetOptions } from './shared/options/helmet.options';
import { ResponseFilter } from './shared/response/response.filter';
import { ResponseInterceptor } from './shared/response/response.interceptor';
import { generateTokenKeys } from './shared/utils';

async function bootstrap() {
  await generateTokenKeys(__dirname);

  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(compression());
  app.enableCors(corsOptions);
  app.use(helmet(helmetOptions));
  app.use(cookieParser(config.get('cookieSecret')));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResponseFilter());

  await app.listen(config.get('port', 4000));
}
bootstrap();
