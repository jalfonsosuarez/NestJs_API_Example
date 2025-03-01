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
import { DuacodeService } from './duacode.service';
import { CreateDuacodeDto } from './dto/create-duacode.dto';
import { UpdateDuacodeDto } from './dto/update-duacode.dto';
import { DuacodePaginationDto } from './dto/duacode.pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Duacode')
@Controller('duacode')
export class DuacodeController {
  constructor(private readonly duacodeService: DuacodeService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Duacode has been successfully created.',
    type: CreateDuacodeDto,
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  async create(@Body() createDuacodeDto: CreateDuacodeDto) {
    return await this.duacodeService.create(createDuacodeDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a list of Duacodes.',
    type: DuacodePaginationDto,
  })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async findAll(@Query() paginationDto: DuacodePaginationDto) {
    return await this.duacodeService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a Duacode.',
  })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.duacodeService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update a Duacode.',
    type: CreateDuacodeDto,
  })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDuacodeDto: UpdateDuacodeDto,
  ) {
    return await this.duacodeService.update(id, updateDuacodeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete a Duacode. Make a soft delete.',
  })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.duacodeService.remove(id);
  }
}
