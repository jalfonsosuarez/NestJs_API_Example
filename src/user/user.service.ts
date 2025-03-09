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
  EmailDto,
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
      delete (newUser as Partial<User>).createdAt;
      delete (newUser as Partial<User>).updatedAt;
      delete (newUser as Partial<User>).inactiveAt;
      delete (newUser as Partial<User>).is_active;
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

  //! For safety, delete this method when you create a firsUser.
  async createFirstUser() {
    try {
      const newUser = await this.user.create({
        data: {
          first_name: 'Administrator',
          second_name: 'Admin',
          email: 'admin@correo.com',
          password: bcrypt.hashSync('A123456b', 10),
          role: 'ADMIN',
        },
      });
      delete (newUser as Partial<User>).password;
      delete (newUser as Partial<User>).createdAt;
      delete (newUser as Partial<User>).updatedAt;
      delete (newUser as Partial<User>).inactiveAt;
      delete (newUser as Partial<User>).is_active;
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
            createdAt: false,
            updatedAt: false,
            inactiveAt: false,
            is_active: false,
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
          createdAt: false,
          updatedAt: false,
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

  async findOne(
    id: string,
    deletePwd: boolean = true,
    isInactive: boolean = false,
  ) {
    try {
      const user = await this.user.findFirst({
        where: {
          id,
          is_active: true,
        },
        omit: {
          createdAt: true,
          updatedAt: true,
          inactiveAt: !isInactive,
          is_active: !isInactive,
          password: deletePwd,
        },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      return user;
    } catch (error) {
      throw new HttpException(
        `Error reading User by id ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findEmail(emailDto: EmailDto, deletePwd: boolean = true) {
    try {
      const user = await this.user.findFirst({
        where: {
          email: emailDto.email,
        },
        omit: {
          createdAt: true,
          updatedAt: true,
          inactiveAt: true,
          password: deletePwd,
        },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

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
      const user = await this.findOne(id, true, true);

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
        omit: {
          createdAt: true,
          updatedAt: true,
          inactiveAt: true,
          is_active: true,
        },
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

      const user = await this.findEmail({ email }, false);

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
        omit: {
          createdAt: true,
          updatedAt: true,
          inactiveAt: true,
          is_active: true,
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
