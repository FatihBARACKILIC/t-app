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
import { cookieOptionsWithExpires } from 'src/shared/options/cookie.options';
import { AccessToken } from 'src/shared/types';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshGuard } from './guards';
import { IAuthController } from './interfaces/auth_controller.interface';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller()
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { access_token, refresh_token } =
      await this.authService.signIn(signInDto);
    res.cookie('refresh_token', refresh_token, cookieOptionsWithExpires(365));
    return { access_token };
  }

  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { access_token, refresh_token } =
      await this.authService.signUp(signUpDto);
    res.cookie('refresh_token', refresh_token, cookieOptionsWithExpires(365));
    return { access_token };
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
  async refreshKey(
    @GetUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { access_token, refresh_token } =
      await this.authService.refreshKey(userId);
    res.cookie('refresh_token', refresh_token, cookieOptionsWithExpires(365));
    return { access_token };
  }
}
