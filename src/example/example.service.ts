/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ExampleInterface, SkillInterface } from 'src/interfaces';
import {
  CreateExampleDto,
  ExamplePaginationDto,
  UpdateExampleDto,
} from './dto';

@Injectable()
export class ExampleService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ExampleService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('ExampleService run');
  }

  async create(createExampleDto: CreateExampleDto) {
    try {
      const { skills, ...rest } = createExampleDto;

      const newExample: ExampleInterface = await this.example.create({
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

      return newExample;
    } catch (error) {
      throw new HttpException(
        `Error creating Example ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(examplePaginationDto: ExamplePaginationDto) {
    const currentPage = examplePaginationDto.page || 1;
    const perPage = examplePaginationDto.limit || 10;

    try {
      const totalPages = await this.example.count({
        where: {
          is_deleted: false,
          name: examplePaginationDto.exampleName
            ? { contains: examplePaginationDto.exampleName }
            : undefined,
        },
      });

      const examples = await this.example.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          is_deleted: false,
          name: examplePaginationDto.exampleName
            ? { contains: examplePaginationDto.exampleName }
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
        data: examples,
        meta: {
          total: totalPages,
          page: currentPage,
          lastPage: Math.ceil(totalPages / perPage),
        },
      };
    } catch (error) {
      throw new HttpException(
        `Error getting Examples ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.example.findFirst({
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

  async update(id: string, updateExampleDto: UpdateExampleDto) {
    try {
      const { skills, ...rest } = updateExampleDto;

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

      const updateExample: ExampleInterface = await this.example.update({
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

      return updateExample;
    } catch (error) {
      throw new HttpException(
        `Error updating Example ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      const example = await this.example.update({
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
          exampleId: id,
        },
        data: {
          is_deleted: true,
          deletedAt: new Date(),
        },
      });
      return example;
    } catch (error) {
      throw new HttpException(
        `Error deleting Example ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
