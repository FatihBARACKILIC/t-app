import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { filterPublicUserData } from 'src/shared/utils/filter-public-user.data';
import { UpdateUserDto } from './dto';
import { IUserService } from './interfaces';
import { PublicUserType } from './types';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(username: string): Promise<PublicUserType> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnprocessableEntityException();
    return filterPublicUserData(user);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<PublicUserType> {
    const newData = await this.prisma.user.update({
      data: { ...updateUserDto },
      where: { id: userId },
    });
    return filterPublicUserData(newData);
  }

  async deleteUser(userId: string): Promise<{ isDeleted: boolean }> {
    await this.prisma.user.delete({ where: { id: userId } });
    return { isDeleted: true };
  }
}
