import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { FileUploadAdapter } from '../adapters';
import { Duacode, PrismaClient } from '@prisma/client';

@Injectable()
export class FilesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('DuacodeImage');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DuacodeImage run');
  }

  async uploadDuacodeImage(
    duacodeId: string,
    file: Express.Multer.File,
  ): Promise<Duacode | null> {
    try {
      const fileUploaded = await FileUploadAdapter.uploadFile(file);
      const duacode = await this.duacode.update({
        where: {
          id: duacodeId,
        },
        data: {
          imageUrl: fileUploaded ?? '',
          updatedAt: new Date(),
        },
      });

      return duacode;
    } catch (error) {
      throw new HttpException(
        `Error updating Duacode Image ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
