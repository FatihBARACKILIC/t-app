import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { AccessGuard, AuthorizationGuard } from 'src/auth/guards';
import { PasswordControlGuard } from 'src/auth/guards/password-control.guard';
import { GetUpdateUserDto } from './decorators/get-update-user-dto.decorator';
import { UpdateUserDto } from './dto';
import { IUserController } from './interfaces';
import { UserService } from './user.service';
import { PublicUserType } from 'src/auth/types';
import { Response } from 'express';
import { cookieOptionsWithExpires } from 'src/shared/options/cookie.options';

@Controller('user/:username')
@UseGuards(AccessGuard, AuthorizationGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUser(@Param('username') username: string): Promise<PublicUserType> {
    return await this.userService.getUser(username);
  }

  @Patch()
  @UseGuards(PasswordControlGuard)
  async updateUser(
    @GetUser('id') userId: string,
    @GetUpdateUserDto() updateUserDto: UpdateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<PublicUserType> {
    const {
      user,
      tokens: { access_token, refresh_token },
    } = await this.userService.updateUser(userId, updateUserDto);
    res.cookie('refresh_token', refresh_token, cookieOptionsWithExpires(365));
    res.setHeader('authorization', `Bearer ${access_token}`);
    return user;
  }

  @Delete()
  @UseGuards(PasswordControlGuard)
  async deleteUser(
    @GetUser('id') userId: string,
  ): Promise<{ isDeleted: boolean }> {
    return await this.userService.deleteUser(userId);
  }
}
