import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto, PaginationDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get('inactives')
  // @Auth(ValidRoles.admin, ValidRoles.superUser)
  async findInactives(@Query() paginationDto: PaginationDto) {
    return await this.userService.findInactives(paginationDto);
  }

  @Get('email')
  // @Auth(ValidRoles.admin, ValidRoles.superUser)
  async findEmail(@Query() email: string) {
    console.log('get email');
    return await this.userService.findEmail(email);
  }

  @Get(':id')
  // @Auth(ValidRoles.admin, ValidRoles.superUser)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @Patch('changepwd')
  // @Auth(ValidRoles.admin, ValidRoles.user)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.userService.changePassword(changePasswordDto);
  }

  @Patch(':id')
  // @Auth(ValidRoles.admin)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  // @Auth(ValidRoles.admin)
  async setInactive(@Param('id') id: string) {
    return this.userService.setInactive(id);
  }

  @Get('updatepwd')
  // @Auth(ValidRoles.admin)
  async updatePwd() {
    return await this.userService.updatePwd();
  }
}
