import { UserRole } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoleList } from '../enum/role.enum';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  second_name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsOptional()
  @IsEnum(UserRoleList, {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message: `Possible roles values are ${UserRoleList}`,
  })
  role?: UserRole = UserRole.USER;

  @IsBoolean()
  @IsOptional()
  is_active: boolean = true;

  @IsDate()
  @IsOptional()
  inactiveAt: Date;
}
