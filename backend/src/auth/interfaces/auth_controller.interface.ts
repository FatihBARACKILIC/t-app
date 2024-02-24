import { Response } from 'express';
import { AccessToken } from '../../shared/types/token.type';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';

export interface IAuthController {
  signIn(signInDto: SignInDto, res: Response): Promise<AccessToken>;
  signUp(signUpDto: SignUpDto, res: Response): Promise<AccessToken>;
  signOut(userId: string, res: Response): Promise<{ status: boolean }>;
  refreshKey(userId: string, res: Response): Promise<AccessToken>;
}
