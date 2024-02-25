import { UpdateUserDto } from '../dto';
import { PublicUserType } from '../types';

export interface IUserService {
  getUser(username: string): Promise<PublicUserType>;
  updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<PublicUserType>;
  deleteUser(userId: string): Promise<{ isDeleted: boolean }>;
}
