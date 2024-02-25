import { SignInDto, SignUpDto } from '../dto';
import { AuthReturnType } from '../types';

export interface IAuthService {
  signIn(signInDto: SignInDto): Promise<AuthReturnType>;
  signUp(signUpDto: SignUpDto): Promise<AuthReturnType>;
  signOut(userId: string): Promise<boolean>;
  refreshKey(userId: string): Promise<AuthReturnType>;
}
