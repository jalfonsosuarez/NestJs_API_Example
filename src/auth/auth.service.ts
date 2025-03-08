/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { envs } from 'src/config';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('LoginService');

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('LoginService run');
  }

  signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.user.findFirst({
      where: { email: loginUserDto.email },
      omit: {
        createdAt: true,
        updatedAt: true,
        inactiveAt: true,
      },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (!user.is_active)
      throw new HttpException('User is inactive.', HttpStatus.UNAUTHORIZED);

    if (!bcrypt.compareSync(loginUserDto.password, user.password))
      throw new HttpException('User/Password not valid', HttpStatus.NOT_FOUND);

    const { password: __, is_active: _, id: ___, ...rest } = user;
    const { id, first_name, second_name, email, role } = user;

    return {
      user: rest,
      token: this.signJWT({ id, first_name, second_name, email, role }),
    };
  }

  async verify(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });
      const userVerified = await this.user.findFirst({
        where: { email: user.email },
      });
      if (!userVerified)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      if (!userVerified.is_active)
        throw new HttpException('User is inactive.', HttpStatus.UNAUTHORIZED);

      delete (userVerified as Partial<User>).password;
      delete (userVerified as Partial<User>).createdAt;
      delete (userVerified as Partial<User>).updatedAt;
      delete (userVerified as Partial<User>).inactiveAt;
      delete (userVerified as Partial<User>).is_active;
      delete (userVerified as Partial<User>).id;
      return {
        user: userVerified,
        token: this.signJWT(user),
      };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return 'Verify token';
  }
}
