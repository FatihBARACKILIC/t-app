import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { cookieOptionsWithExpires } from '../shared/options/cookie.options';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshGuard } from './guards';
import { IAuthController } from './interfaces/auth_controller.interface';
import { AuthReturnType } from './types';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller()
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<AuthReturnType> {
    return await this.authService.signIn(signInDto);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<AuthReturnType> {
    return await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  @UseGuards(RefreshGuard)
  async signOut(
    @GetUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ status: boolean }> {
    let status = false;
    if (userId) status = await this.authService.signOut(userId);
    res.cookie('refresh_token', 'null', cookieOptionsWithExpires(1));
    return { status };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-key')
  @UseGuards(RefreshGuard)
  async refreshKey(@GetUser('id') userId: string): Promise<AuthReturnType> {
    return await this.authService.refreshKey(userId);
  }
}
