import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenService } from '../../shared/services/jwt/json-web-token.service';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JsonWebTokenService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const [tokenType, accessToken] = req.headers['authorization']?.split(' ');
    if (tokenType !== 'Bearer' || !accessToken)
      throw new UnauthorizedException();

    const payload = await this.jwtService.validateAccessToken(accessToken);
    const user = await this.prisma.user.findFirst({
      where: { id: payload.id },
    });
    if (!user || user.email !== payload.email)
      throw new UnauthorizedException('Invalid refresh token');
    req.user = user;
    return true;
  }
}
