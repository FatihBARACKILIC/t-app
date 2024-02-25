import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { PublicUserType } from './types';
import { UserService } from './user.service';

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
  ): Promise<PublicUserType> {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete()
  @UseGuards(PasswordControlGuard)
  async deleteUser(
    @GetUser('id') userId: string,
  ): Promise<{ isDeleted: boolean }> {
    return await this.userService.deleteUser(userId);
  }
}
