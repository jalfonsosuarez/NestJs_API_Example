import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { envs } from '../../config';
import { Request } from 'express';
@Injectable()
export class SwaggerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(
      base64Credentials,
      'base64',
    ).toString('ascii');
    const [username, password] = decodedCredentials.split(':');

    //get the username and password from the config file
    const usr = envs.swagger.userName;
    const pswd = envs.swagger.password;
    if (username === usr && password === pswd) {
      return true;
    }

    throw new UnauthorizedException('Invalid credentials!');
  }
}
