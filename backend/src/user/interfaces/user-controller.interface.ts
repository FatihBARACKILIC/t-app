import { UpdateUserDto } from '../dto';
import { PublicUserType } from '../types';

export interface IUserController {
  getUser(username: string): Promise<PublicUserType>;
  updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<PublicUserType>;
  deleteUser(userId: string): Promise<{ isDeleted: boolean }>;
}
