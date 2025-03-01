/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DuacodeInterface } from 'src/interfaces/duacode.interface';
import { SkillInterface } from 'src/interfaces';
import {
  CreateDuacodeDto,
  DuacodePaginationDto,
  UpdateDuacodeDto,
} from './dto';

@Injectable()
export class DuacodeService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('DuacodeService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DuacodeService run');
  }

  async create(createDuacodeDto: CreateDuacodeDto) {
    try {
      const { skills, ...rest } = createDuacodeDto;

      const newDuacode: DuacodeInterface = await this.duacode.create({
        data: {
          nif: rest.nif,
          name: rest.name,
          biografy: rest.biografy,
          departament: rest.departament,
          workstation: rest.workstation,
          omeletOnion: rest.omeletOnion,
          birthdate: rest?.birthdate ?? '',
          imageUrl: rest.imageUrl,
          skills: {
            createMany: {
              data: skills.map((skill) => ({
                description: skill.description ?? '',
              })),
              skipDuplicates: true,
            },
          },
        },
        include: {
          skills: true,
        },
      });

      return newDuacode;
    } catch (error) {
      throw new HttpException(
        `Error creating Duacode ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(duacodePaginationDto: DuacodePaginationDto) {
    const currentPage = duacodePaginationDto.page || 1;
    const perPage = duacodePaginationDto.limit || 10;

    try {
      const totalPages = await this.duacode.count({
        where: {
          is_deleted: false,
          name: duacodePaginationDto.duacodeName
            ? { contains: duacodePaginationDto.duacodeName }
            : undefined,
        },
      });

      const duacodes = await this.duacode.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          is_deleted: false,
          name: duacodePaginationDto.duacodeName
            ? { contains: duacodePaginationDto.duacodeName }
            : undefined,
        },
        orderBy: [
          {
            name: 'asc',
          },
        ],
        omit: {
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
        include: {
          skills: {
            where: {
              is_deleted: false,
            },
            omit: {
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            },
          },
        },
      });
      return {
        data: duacodes,
        meta: {
          total: totalPages,
          page: currentPage,
          lastPage: Math.ceil(totalPages / perPage),
        },
      };
    } catch (error) {
      throw new HttpException(
        `Error getting Duacodes ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.duacode.findFirst({
        where: {
          id: id,
          is_deleted: false,
        },
        omit: {
          updatedAt: true,
          createdAt: true,
          deletedAt: true,
        },
        include: {
          skills: {
            omit: {
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            },
          },
        },
      });
      if (!product)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateDuacodeDto: UpdateDuacodeDto) {
    try {
      const { skills, ...rest } = updateDuacodeDto;

      const createSkills: SkillInterface[] = [];
      const updateSkills: SkillInterface[] = [];

      skills?.map((skill) => {
        if (!skill.id) {
          createSkills.push({
            description: skill.description,
          });
        } else {
          updateSkills.push({
            id: skill.id,
            description: skill.description,
            is_deleted: skill.is_deleted,
            deletedAt: skill.is_deleted ? new Date() : undefined,
          });
        }
      });

      const updateDuacode: DuacodeInterface = await this.duacode.update({
        where: {
          id,
        },
        data: {
          nif: rest?.nif,
          name: rest?.name,
          biografy: rest?.biografy,
          departament: rest?.departament,
          workstation: rest?.workstation,
          omeletOnion: rest?.omeletOnion,
          birthdate: rest?.birthdate ?? '',
          imageUrl: rest?.imageUrl,
          skills: {
            createMany: {
              data: createSkills,
              skipDuplicates: true,
            },
          },
        },
        include: {
          skills: true,
        },
      });

      updateSkills.map(async (skill) => {
        await this.skills.update({
          where: {
            id: skill.id,
          },
          data: {
            description: skill.description,
            is_deleted: skill.is_deleted,
            deletedAt: skill.deletedAt,
          },
        });
      });

      return updateDuacode;
    } catch (error) {
      throw new HttpException(
        `Error updating Duacode ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      const duacode = await this.duacode.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deletedAt: new Date(),
        },
      });

      await this.skills.updateMany({
        where: {
          duacodeId: id,
        },
        data: {
          is_deleted: true,
          deletedAt: new Date(),
        },
      });
      return duacode;
    } catch (error) {
      throw new HttpException(
        `Error deleting Duacode ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
