import { TokenType } from 'src/shared/types';
import { PublicUserType } from './public-user.type';

export type AuthReturnType = {
  user: PublicUserType;
  tokens: TokenType;
};
