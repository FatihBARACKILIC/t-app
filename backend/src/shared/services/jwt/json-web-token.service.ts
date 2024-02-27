import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessToken, Payload, RefreshToken, TokenType } from '../../types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JsonWebTokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async generateTokens({ id, email }: Payload): Promise<TokenType> {
    const { access_token } = await this.generateAccessToken({ id, email });
    const { refresh_token } = await this.generateRefreshToken({ id, email });
    return { access_token, refresh_token };
  }

  async generateAccessToken(payload: Payload): Promise<AccessToken> {
    const secret = this.configService.getOrThrow('jwt.accessPrivate');
    const algorithm = this.configService.getOrThrow('jwt.algorithm');
    const expiresIn = this.configService.getOrThrow('jwt.accessExpiresIn');

    try {
      const access_token = await this.jwtService.signAsync(payload, {
        secret,
        algorithm,
        expiresIn,
      });
      return { access_token };
    } catch (error) {
      throw error;
    }
  }

  async validateAccessToken(token: string): Promise<Payload> {
    const secret = this.configService.getOrThrow('jwt.accessPublic');

    try {
      const payload: Payload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      if (!payload) throw new UnauthorizedException();
      return payload;
    } catch (error) {
      throw error;
    }
  }

  async generateRefreshToken(payload: Payload): Promise<RefreshToken> {
    const secret = this.configService.getOrThrow('jwt.refreshPrivate');
    const algorithm = this.configService.getOrThrow('jwt.algorithm');
    const expiresIn = this.configService.getOrThrow('jwt.refreshExpiresIn');

    try {
      const refresh_token = await this.jwtService.signAsync(payload, {
        secret,
        algorithm,
        expiresIn,
      });

      await this.prisma.user.update({
        where: { id: payload.id },
        data: { activeRefreshToken: refresh_token },
      });
      return { refresh_token };
    } catch (error) {
      throw error;
    }
  }

  async validateRefreshToken(token: string): Promise<Payload> {
    const secret = this.configService.getOrThrow('jwt.refreshPublic');

    try {
      const payload: Payload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      if (!payload) throw new UnauthorizedException();
      return payload;
    } catch (error) {
      throw error;
    }
  }
}
