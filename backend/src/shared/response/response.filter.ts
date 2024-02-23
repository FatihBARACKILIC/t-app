import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionType } from '../types/exception.type';

@Catch()
export class ResponseFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode: number =
      exception instanceof HttpException
        ? exception?.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const userResponse: ExceptionType = {
      status: false,
      statusCode,
      path: request.url,
      message: exception.message,
      result:
        exception instanceof HttpException
          ? exception?.getResponse()
          : { exception },
    };

    response.status(statusCode).json(userResponse);
  }
}
