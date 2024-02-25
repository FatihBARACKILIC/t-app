import { Response } from 'express';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { PublicUserType } from '../types';

export interface IAuthController {
  signIn(signInDto: SignInDto, res: Response): Promise<PublicUserType>;
  signUp(signUpDto: SignUpDto, res: Response): Promise<PublicUserType>;
  signOut(userId: string, res: Response): Promise<{ status: boolean }>;
  refreshKey(userId: string, res: Response): Promise<PublicUserType>;
}
