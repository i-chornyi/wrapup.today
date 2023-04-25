import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({ path: 'projects', version: '1' })
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => {
          throw new HttpException(
            {
              statusCode: HttpStatus.NOT_ACCEPTABLE,
              message: 'Invalid ID format',
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        },
      }),
    )
    id: ProjectEntity['id'],
  ) {
    return this.projectService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/wrapups')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  async getProjectWrapupsByDay(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => {
          throw new HttpException(
            {
              statusCode: HttpStatus.NOT_ACCEPTABLE,
              message: 'Invalid ID format',
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        },
      }),
    )
    id: ProjectEntity['id'],
    @Query('day') day: string,
    @Req() req,
  ) {
    console.log(req.cookies);
    return this.projectService.getProjectWrapupsByDay(id, day);
  }

  @Patch(':id')
  update(
    @Param('id') id: ProjectEntity['id'],
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ProjectEntity['id']) {
    return this.projectService.remove(id);
  }
}
