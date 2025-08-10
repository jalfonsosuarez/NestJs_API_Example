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
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "src/auth/decorators";
import { ValidRoles } from "src/auth/interfaces";
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  CreateUserDto,
  UserPaginationDto,
  ChangePasswordDto,
  UpdateUserDto,
  EmailDto,
} from "./dto";

@ApiBearerAuth()
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The User has been successfully created.",
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
  @Auth(ValidRoles.admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //! For safety, delete this method when you create a firsUser.
  @Post("firstuser")
  @ApiExcludeEndpoint()
  createFirstUser() {
    return this.userService.createFirstUser();
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return a list of Users",
    type: UserPaginationDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  findAll(@Query() paginationDto: UserPaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get("inactives")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return a list of inactive Users",
    type: UserPaginationDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  async findInactives(@Query() paginationDto: UserPaginationDto) {
    return await this.userService.findInactives(paginationDto);
  }

  @Get("email")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return a User.",
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  async findEmail(@Body() emailDto: EmailDto) {
    console.log("get email", emailDto);
    return await this.userService.findEmail(emailDto);
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return a User.",
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @Patch("updatepwd")
  @ApiExcludeEndpoint()
  @Auth(ValidRoles.admin)
  async updatePwd() {
    return await this.userService.updatePwd();
  }

  @Patch("changepwd")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return a User",
    type: ChangePasswordDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
  @Auth(ValidRoles.admin, ValidRoles.user)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.userService.changePassword(changePasswordDto);
  }

  @Patch(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update User",
    type: UpdateUserDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
  @Auth(ValidRoles.admin)
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete a User. Make a soft delete.",
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden." })
  @Auth(ValidRoles.admin)
  async setInactive(@Param("id") id: string) {
    return this.userService.setInactive(id);
  }
}
