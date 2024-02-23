import {
  IsAlphanumeric,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsStrongPassword,
  Length,
  ValidateIf,
} from 'class-validator';

export class SignInDto {
  @IsAlphanumeric()
  @Length(3, 100)
  @ValidateIf((obj) => !obj.email && !obj.phoneNumber, {
    message: 'username, email or phone number',
  })
  username?: string;

  @IsEmail()
  @ValidateIf((obj) => !obj.username && !obj.phoneNumber, {
    message: 'username, email or phone number',
  })
  email?: string;

  @IsMobilePhone('tr-TR')
  @ValidateIf((obj) => !obj.email && !obj.username, {
    message: 'username, email or phone number',
  })
  phoneNumber?: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 2,
    minNumbers: 2,
    minSymbols: 2,
    minUppercase: 2,
  })
  @IsNotEmpty()
  password!: string;
}
