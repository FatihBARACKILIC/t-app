import { HttpStatus } from '@nestjs/common';

export type ExceptionType = {
  status: false;
  statusCode: number | HttpStatus;
  path: string;
  message: string;
  result: unknown;
};
