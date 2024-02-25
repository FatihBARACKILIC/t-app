import { PublicUserType } from 'src/auth/types';
import { UpdateUserDto } from '../dto';
import { Response } from 'express';

export interface IUserController {
  getUser(username: string): Promise<PublicUserType>;
  updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
    res: Response,
  ): Promise<PublicUserType>;
  deleteUser(userId: string): Promise<{ isDeleted: boolean }>;
}
