import { CreateUserDto } from './create-user.dto';
import { ApiSchema, PartialType } from '@nestjs/swagger';

@ApiSchema({
  description: 'Description of UdateUserDto schema',
})
export class UpdateUserDto extends PartialType(CreateUserDto) {}
