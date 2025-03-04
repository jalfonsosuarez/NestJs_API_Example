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
  CreateDuacodeDto,
  DuacodePaginationDto,
  UpdateDuacodeDto,
} from './dto';
import { DuacodeService } from './duacode.service';

@ApiTags('Duacode')
@ApiBearerAuth()
@Controller('duacode')
export class DuacodeController {
  constructor(private readonly duacodeService: DuacodeService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Duacode has been successfully created.',
    type: CreateDuacodeDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() createDuacodeDto: CreateDuacodeDto) {
    return await this.duacodeService.create(createDuacodeDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a list of Duacodes.',
    type: DuacodePaginationDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async findAll(@Query() paginationDto: DuacodePaginationDto) {
    return await this.duacodeService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a Duacode.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.duacodeService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update a Duacode.',
    type: CreateDuacodeDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDuacodeDto: UpdateDuacodeDto,
  ) {
    return await this.duacodeService.update(id, updateDuacodeDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete a Duacode. Make a soft delete.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.duacodeService.remove(id);
  }
}
