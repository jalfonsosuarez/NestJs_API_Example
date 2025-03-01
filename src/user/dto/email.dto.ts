import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

@ApiSchema()
export class EmailDto {
  @ApiProperty({
    description: 'User email.',
    required: true,
  })
  @IsEmail()
  @IsString()
  email: string;
}
