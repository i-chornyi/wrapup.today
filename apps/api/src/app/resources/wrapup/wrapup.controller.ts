import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WrapupService } from './wrapup.service';
import { CreateWrapupDto } from './dto/create-wrapup.dto';
import { UpdateWrapupDto } from './dto/update-wrapup.dto';

@Controller({ path: 'wrapups', version: '1' })
export class WrapupController {
  constructor(private readonly wrapupService: WrapupService) {}

  @Post()
  create(@Body() createWrapupDto: CreateWrapupDto) {
    return this.wrapupService.create(createWrapupDto);
  }

  @Get()
  findAll() {
    return this.wrapupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wrapupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWrapupDto: UpdateWrapupDto) {
    return this.wrapupService.update(+id, updateWrapupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wrapupService.remove(+id);
  }
}
