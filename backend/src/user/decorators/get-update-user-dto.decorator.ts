import {
  BadRequestException,
  ExecutionContext,
  ValidationPipe,
  createParamDecorator,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto';
import { ValidationError } from 'class-validator';

export const GetUpdateUserDto = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const newUser = req.body.updateUser;

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const validatedData = await validationPipe.transform(newUser, {
      metatype: UpdateUserDto,
      type: 'body',
    });

    if (validatedData instanceof ValidationError) {
      throw new BadRequestException(validatedData);
    }

    return newUser;
  },
);
