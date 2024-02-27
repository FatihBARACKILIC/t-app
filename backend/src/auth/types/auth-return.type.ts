import { TokenType } from '../../shared/types';
import { PublicUserType } from './public-user.type';

export type AuthReturnType = {
  user: PublicUserType;
  tokens: TokenType;
};
