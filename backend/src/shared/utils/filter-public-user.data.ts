import { PublicUserType } from '../../auth/types';

export function filterPublicUserData({
  createdAt,
  email,
  firstName,
  phoneNumber,
  username,
  lastName,
}: PublicUserType & unknown): PublicUserType {
  return {
    createdAt,
    email,
    firstName,
    phoneNumber,
    username,
    lastName,
  };
}
