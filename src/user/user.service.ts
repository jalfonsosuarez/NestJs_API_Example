import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  UserPaginationDto,
  UpdateUserDto,
  ChangePasswordDto,
} from './dto';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UserService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('UserService run');
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
      const newUser = await this.user.create({ data: createUserDto });
      delete (newUser as Partial<User>).password;
      return {
        user: newUser,
        token: 'abd',
      };
    } catch (error) {
      throw new HttpException(
        `Error creating User ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(paginationDto: UserPaginationDto) {
    try {
      const totalPages = await this.user.count({
        where: {
          role: paginationDto.role,
          is_active: true,
        },
      });
      const currentPage = paginationDto.page || 1;
      const perPage = paginationDto.limit || 10;
      return {
        data: await this.user.findMany({
          skip: (currentPage - 1) * perPage,
          take: perPage,
          where: {
            role: paginationDto.role,
            is_active: true,
          },
          select: {
            id: true,
            first_name: true,
            second_name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: [
            {
              second_name: 'asc',
            },
            {
              first_name: 'asc',
            },
          ],
        }),
        meta: {
          total: totalPages,
          page: currentPage,
          lastPage: Math.ceil(totalPages / perPage),
        },
      };
    } catch (error) {
      throw new HttpException(
        `Error updating User ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findInactives(paginationDto: UserPaginationDto) {
    const totalPages = await this.user.count({
      where: {
        role: paginationDto.role,
        is_active: false,
      },
    });
    const currentPage = paginationDto.page || 1;
    const perPage = paginationDto.limit || 10;

    return {
      data: await this.user.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          role: paginationDto.role,
          is_active: false,
        },
        select: {
          id: true,
          first_name: true,
          second_name: true,
          email: true,
          role: true,
          is_active: true,
          createdAt: true,
          updatedAt: true,
          inactiveAt: true,
        },
        orderBy: [
          {
            second_name: 'asc',
          },
          {
            first_name: 'asc',
          },
        ],
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      },
    };
  }

  async findOne(id: string) {
    try {
      const user = await this.user.findFirst({
        where: {
          id,
          is_active: true,
        },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      delete (user as Partial<User>).password;

      return user;
    } catch (error) {
      throw new HttpException(
        `Error reading User by id ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findEmail(email: string, deletePwd: boolean = true) {
    try {
      const user = await this.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      if (deletePwd) {
        delete (user as Partial<User>).password;
      }

      return user;
    } catch (error) {
      throw new HttpException(
        `Error reading User by email ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async setInactive(id: string) {
    try {
      const user = await this.findOne(id);

      if (user) {
        user.is_active = false;
        user.inactiveAt = new Date();
      }

      const inactiveUser = await this.user.update({
        data: user,
        where: { id },
      });
      return inactiveUser;
    } catch (error) {
      throw new HttpException(
        `Error setting User as inactive ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.user.findFirst({
        where: {
          id,
        },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const updatedUser = this.user.update({
        data: updateUserDto,
        where: { id },
      });
      return updatedUser;
    } catch (error) {
      throw new HttpException(
        `Error updating User ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    try {
      const { email, oldPassword, newPassword } = changePasswordDto;

      const user = await this.findEmail(email, false);

      if (!bcrypt.compareSync(oldPassword, user.password))
        throw new HttpException(
          'User/Password not valid',
          HttpStatus.NOT_FOUND,
        );

      await this.user.update({
        data: {
          password: bcrypt.hashSync(newPassword, 10),
        },
        where: {
          email,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error changing User password ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePwd() {
    try {
      const updatedUsers = await this.user.updateMany({
        data: {
          password: bcrypt.hashSync('A123456b', 10),
        },
      });

      return updatedUsers;
    } catch (error) {
      throw new HttpException(
        `Error updating User password ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
