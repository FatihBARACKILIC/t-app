import { TokenType } from 'src/shared/types';
import { SignInDto, SignUpDto } from '../dto';

export interface IAuthService {
  signIn(signInDto: SignInDto): Promise<TokenType>;
  signUp(signUpDto: SignUpDto): Promise<TokenType>;
  signOut(userId: string): Promise<void>;
  refreshKey(userId: string): Promise<TokenType>;
}
