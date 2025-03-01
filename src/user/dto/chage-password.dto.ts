import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

@ApiSchema()
export class ChangePasswordDto {
  @ApiProperty({
    description: 'User email.',
    required: true,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User old password.',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  oldPassword: string;

  @ApiProperty({
    description: 'User new password.',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  newPassword: string;
}
