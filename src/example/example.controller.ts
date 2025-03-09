import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import {
  CreateExampleDto,
  ExamplePaginationDto,
  UpdateExampleDto,
} from './dto';
import { ExampleService } from './example.service';

@ApiTags('Example')
@ApiBearerAuth()
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Example has been successfully created.',
    type: CreateExampleDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() createExampleDto: CreateExampleDto) {
    return await this.exampleService.create(createExampleDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a list of Examples.',
    type: ExamplePaginationDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async findAll(@Query() paginationDto: ExamplePaginationDto) {
    return await this.exampleService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a Example.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.exampleService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update a Example.',
    type: CreateExampleDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExampleDto: UpdateExampleDto,
  ) {
    return await this.exampleService.update(id, updateExampleDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete a Example. Make a soft delete.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.exampleService.remove(id);
  }
}
