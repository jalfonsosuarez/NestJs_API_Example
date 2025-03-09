import {
  Controller,
  Get,
  Body,
  UseGuards,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { Token } from './decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Example Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Log a user into API.',
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verify User token.',
  })
  async verify(@Token() token: string) {
    return await this.authService.verify(token);
  }
}
