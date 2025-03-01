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
import { ApiSchema, ApiProperty } from '@nestjs/swagger';
@ApiSchema({
  description: 'Descrition of the CreateUserDto schema',
})
export class CreateUserDto {
  @ApiProperty({
    description: 'User first name.',
    required: true,
    example: 'John',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'User second name.',
    required: true,
    example: 'Smith',
  })
  @IsString()
  second_name: string;

  @ApiProperty({
    description: 'User email.',
    required: true,
    example: 'john.smith@email.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description:
      'User password. It must have a Uppercase, lowercase letter and a number',
    required: true,
    minLength: 6,
    maxLength: 50,
    example: 'Ab1234',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    description: `User role. It must be one of ADMIN | SUPERUSER | USER`,
    required: false,
    default: 'USER',
    example: 'USER',
  })
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
