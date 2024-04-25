import { Response } from 'express';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { AuthReturnType } from '../types';

export interface IAuthController {
  signIn(signInDto: SignInDto, res: Response): Promise<AuthReturnType>;
  signUp(signUpDto: SignUpDto, res: Response): Promise<AuthReturnType>;
  signOut(userId: string, res: Response): Promise<{ status: boolean }>;
  refreshKey(userId: string, res: Response): Promise<AuthReturnType>;
}
