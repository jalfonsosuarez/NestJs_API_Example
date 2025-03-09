import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { FileUploadAdapter } from '../adapters';
import { Example, PrismaClient } from '@prisma/client';

@Injectable()
export class FilesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ExampleImage');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('ExampleImage run');
  }

  async uploadExampleImage(
    exampleId: string,
    file: Express.Multer.File,
  ): Promise<Example | null> {
    try {
      const fileUploaded = await FileUploadAdapter.uploadFile(file);
      const example = await this.example.update({
        where: {
          id: exampleId,
        },
        data: {
          imageUrl: fileUploaded ?? '',
          updatedAt: new Date(),
        },
      });

      return example;
    } catch (error) {
      throw new HttpException(
        `Error updating Example Image ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
