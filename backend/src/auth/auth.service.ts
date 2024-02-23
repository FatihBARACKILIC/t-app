import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ArgonService } from 'src/shared/services/argon/argon.service';
import { JsonWebTokenService } from 'src/shared/services/jwt/json-web-token.service';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { TokenType } from 'src/shared/types';
import {
  formatPhoneNumber,
  generateUserNameIfNotExist,
} from 'src/shared/utils';
import { SignInDto, SignUpDto } from './dto';
import { IAuthService } from './types';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jsonWebTokenService: JsonWebTokenService,
    private readonly argonService: ArgonService,
  ) {}

  public async signIn(signInDto: SignInDto): Promise<TokenType> {
    const { password } = signInDto;

    const signInKeys = Object.keys(signInDto);
    // ?  remove password from list
    signInKeys.pop();
    if (signInKeys.length !== 1) {
      throw new BadRequestException(
        'Fill only one of the fields email, phoneNumber, username',
      );
    }

    const key = signInKeys[0];
    let value = signInDto[key as keyof SignInDto]!;
    if (value === 'phoneNumber') value = formatPhoneNumber(value);
    const user = await this.prisma.user.findFirst({ where: { [key]: value } });

    const invalidUserError = new UnauthorizedException(
      `Invalid ${key} or password`,
    );
    if (!user) throw invalidUserError;
    const isValid = await this.argonService.verify(user.password, password);
    if (!isValid) throw invalidUserError;

    const tokens = await this.jsonWebTokenService.generateTokens(user);
    return tokens;
  }

  public async signUp(signUpDto: SignUpDto): Promise<TokenType> {
    try {
      const username = generateUserNameIfNotExist(signUpDto.username);
      const phoneNumber = formatPhoneNumber(signUpDto.phoneNumber);
      const password = await this.argonService.hash(signUpDto.password);

      const createdUser = await this.prisma.user.create({
        data: {
          ...signUpDto,
          username,
          phoneNumber,
          password,
        },
      });

      const tokens = await this.jsonWebTokenService.generateTokens(createdUser);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            `[${error?.meta?.target}] is already in use`,
          );
        }
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }

  public async signOut(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { activeRefreshToken: null },
    });
  }

  public async refreshKey(userId: string): Promise<TokenType> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    const tokens = await this.jsonWebTokenService.generateTokens(user);
    return tokens;
  }
}
