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
import { Example } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Example Image')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('example/:exampleId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Example image has been successfully created.',
  })
  @ApiParam({
    name: 'exampleId',
    description: 'The example id',
    required: true,
  })
  @ApiParam({
    name: 'file',
    description: 'The example image',
    required: true,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Auth(ValidRoles.admin)
  async uploadProductImage(
    @Param('exampleId', ParseUUIDPipe) exampleId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Example | null> {
    return await this.filesService.uploadExampleImage(exampleId, file);
  }
}
