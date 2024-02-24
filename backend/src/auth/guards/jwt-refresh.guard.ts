import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenService } from 'src/shared/services/jwt/json-web-token.service';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private readonly jwtService: JsonWebTokenService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    // const refreshToken = req.cookies['refresh_token'];
    const refreshToken = req.signedCookies['refresh_token'];

    const payload = await this.jwtService.validateRefreshToken(refreshToken);
    const user = await this.prisma.user.findFirst({
      where: { id: payload.id },
    });
    if (
      !user ||
      user.email !== payload.email ||
      refreshToken !== user?.activeRefreshToken
    )
      throw new UnauthorizedException('Invalid refresh token');
    req.user = user;

    return true;
  }
}
