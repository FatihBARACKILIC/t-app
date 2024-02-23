import { HttpStatus } from '@nestjs/common';

export type ResponseType = {
  status: true;
  statusCode: number | HttpStatus;
  path: string;
  result: unknown;
};
