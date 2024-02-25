import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(SignUpDto) {}
