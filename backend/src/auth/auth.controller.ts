import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AccessToken } from 'src/shared/types';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { IAuthController } from './types/auth_controller.interface';
import { RefreshGuard } from './guards';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller()
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { access_token, refresh_token } =
      await this.authService.signIn(signInDto);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
    });

    return { access_token };
  }

  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { access_token, refresh_token } =
      await this.authService.signUp(signUpDto);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
    });

    return { access_token };
  }

  @Post('signout')
  @UseGuards(RefreshGuard)
  async signOut(@GetUser('id') userId: string): Promise<void> {
    if (userId) await this.authService.signOut(userId);
  }

  @Post('refresh-key')
  @UseGuards(RefreshGuard)
  async refreshKey(
    @GetUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { access_token, refresh_token } =
      await this.authService.refreshKey(userId);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
    });

    return { access_token };
  }
}
