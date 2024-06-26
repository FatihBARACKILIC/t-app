import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenService } from '../../shared/services/jwt/json-web-token.service';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private readonly jwtService: JsonWebTokenService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    // const refreshToken = req.cookies['refresh_token'];
    let refreshToken: string = req.headers['authorization'];
    if (!refreshToken || !refreshToken.includes('Refresh'))
      throw new UnauthorizedException();
    refreshToken = refreshToken.split(' ').at(1)!;
    if (!refreshToken) throw new UnauthorizedException();

    const payload = await this.jwtService.validateRefreshToken(refreshToken);
    const user = await this.prisma.user.findFirst({
      where: { id: payload.id },
    });
    if (
      !user ||
      user.email !== payload.email
      //  || refreshToken !== user?.activeRefreshToken
    )
      throw new UnauthorizedException('Invalid refresh token');
    req.user = user;

    return true;
  }
}
