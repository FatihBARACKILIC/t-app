import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map } from 'rxjs';
import { ResponseType } from '../types/response.type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next
      .handle()
      .pipe(map((res: unknown) => this.responseHandler(res, context)));
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = response.statusCode;

    const userResponse: ResponseType = {
      status: true,
      statusCode,
      path: request.url,
      result: res,
    };

    return userResponse;
  }
}
