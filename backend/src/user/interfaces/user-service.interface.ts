import { AuthReturnType, PublicUserType } from '../../auth/types';
import { UpdateUserDto } from '../dto';

export interface IUserService {
  getUser(username: string): Promise<PublicUserType>;
  updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<AuthReturnType>;
  deleteUser(userId: string): Promise<{ isDeleted: boolean }>;
}
