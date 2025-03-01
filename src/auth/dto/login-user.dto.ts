import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

@ApiSchema({
  description: 'Descrition of the LoginUserDto schema',
})
export class LoginUserDto {
  @ApiProperty({
    description: 'User email.',
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password.',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
