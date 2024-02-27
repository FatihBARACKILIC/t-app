import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ArgonService } from '../shared/services/argon/argon.service';
import { JsonWebTokenService } from '../shared/services/jwt/json-web-token.service';
import { PrismaService } from '../shared/services/prisma/prisma.service';
import { formatPhoneNumber, generateUserNameIfNotExist } from '../shared/utils';
import { filterPublicUserData } from '../shared/utils/filter-public-user.data';
import { SignInDto, SignUpDto } from './dto';
import { IAuthService } from './interfaces';
import { AuthReturnType } from './types';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jsonWebTokenService: JsonWebTokenService,
    private readonly argonService: ArgonService,
  ) {}

  public async signIn(signInDto: SignInDto): Promise<AuthReturnType> {
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
    return { user: filterPublicUserData(user), tokens };
  }

  public async signUp(signUpDto: SignUpDto): Promise<AuthReturnType> {
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
      return { user: filterPublicUserData(createdUser), tokens };
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

  public async signOut(userId: string): Promise<boolean> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { activeRefreshToken: null },
    });
    return true;
  }

  public async refreshKey(userId: string): Promise<AuthReturnType> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    const tokens = await this.jsonWebTokenService.generateTokens(user);
    return { user: filterPublicUserData(user), tokens };
  }
}
