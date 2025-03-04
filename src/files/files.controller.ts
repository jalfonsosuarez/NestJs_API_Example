import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Duacode } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Duacode Image')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('duacode/:duacodeId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Duacode image has been successfully created.',
  })
  @ApiParam({
    name: 'duacodeId',
    description: 'The duacode id',
    required: true,
  })
  @ApiParam({
    name: 'file',
    description: 'The duacode image',
    required: true,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Auth(ValidRoles.admin)
  async uploadProductImage(
    @Param('duacodeId', ParseUUIDPipe) duacoideId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Duacode | null> {
    return await this.filesService.uploadDuacodeImage(duacoideId, file);
  }
}
