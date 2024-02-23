import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class SignUpDto {
  @IsAlpha()
  @Length(2, 100)
  @IsNotEmpty()
  firstName!: string;

  @IsAlpha()
  @Length(2, 100)
  @IsOptional()
  lastName?: string;

  @IsAlphanumeric()
  @Length(3, 100)
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsMobilePhone('tr-TR')
  @IsNotEmpty()
  phoneNumber!: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 2,
      minNumbers: 2,
      minSymbols: 2,
      minUppercase: 2,
    },
    {
      message:
        'Password must contain at least 8 characters, 2 lowercase letters, 2 numbers, 2 symbols, and 2 uppercase letters.',
    },
  )
  @IsNotEmpty()
  password!: string;
}
