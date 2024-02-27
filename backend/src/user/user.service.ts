import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma/prisma.service';
import { filterPublicUserData } from '../shared/utils/filter-public-user.data';
import { UpdateUserDto } from './dto';
import { IUserService } from './interfaces';
import { AuthReturnType, PublicUserType } from '../auth/types';
import { JsonWebTokenService } from '../shared/services/jwt/json-web-token.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jsonWebTokenService: JsonWebTokenService,
  ) {}

  async getUser(username: string): Promise<PublicUserType> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnprocessableEntityException();
    return filterPublicUserData(user);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<AuthReturnType> {
    const newData = await this.prisma.user.update({
      data: { ...updateUserDto },
      where: { id: userId },
    });

    const tokens = await this.jsonWebTokenService.generateTokens(newData);

    return {
      user: filterPublicUserData(newData),
      tokens,
    };
  }

  async deleteUser(userId: string): Promise<{ isDeleted: boolean }> {
    await this.prisma.user.delete({ where: { id: userId } });
    return { isDeleted: true };
  }
}
