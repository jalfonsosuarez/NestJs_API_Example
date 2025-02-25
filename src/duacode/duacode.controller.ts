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
} from '@nestjs/common';
import { DuacodeService } from './duacode.service';
import { CreateDuacodeDto } from './dto/create-duacode.dto';
import { UpdateDuacodeDto } from './dto/update-duacode.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('duacode')
export class DuacodeController {
  constructor(private readonly duacodeService: DuacodeService) {}

  @Post()
  async create(@Body() createDuacodeDto: CreateDuacodeDto) {
    return await this.duacodeService.create(createDuacodeDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.duacodeService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.duacodeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDuacodeDto: UpdateDuacodeDto,
  ) {
    return await this.duacodeService.update(id, updateDuacodeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.duacodeService.remove(id);
  }
}
