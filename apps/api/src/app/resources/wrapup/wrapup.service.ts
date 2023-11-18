import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateWrapupDto } from './dto/create-wrapup.dto';
import { UpdateWrapupDto } from './dto/update-wrapup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity, WrapupEntity } from '@wrapup/db-entities';
import { Between, Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { ProjectService } from '../project/project.service';

@Injectable()
export class WrapupService {
  constructor(
    @InjectRepository(WrapupEntity)
    private wrapupEntityRepository: Repository<WrapupEntity>,
    @Inject(forwardRef(() => ProjectService))
    private projectService: ProjectService,
  ) {}

  async create(createWrapupDto: CreateWrapupDto) {
    const project = await this.projectService.findOne(
      createWrapupDto.projectId,
    );
    const newWrapup = this.wrapupEntityRepository.create({
      project,
      day: createWrapupDto.day,
      planned: createWrapupDto.planned,
      done: createWrapupDto.done,
      blockers: createWrapupDto.blockers,
    });
    return this.wrapupEntityRepository.save(newWrapup);
  }

  getWrapupsByProjectAndDay(projectId: ProjectEntity['id'], day: string) {
    return this.wrapupEntityRepository.findBy({
      projectId,
      day: Between(
        DateTime.fromISO(day).startOf('day').toJSDate(),
        DateTime.fromISO(day).endOf('day').toJSDate(),
      ),
    });
  }

  findAll() {
    return `This action returns all wrapup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wrapup`;
  }

  update(id: number, updateWrapupDto: UpdateWrapupDto) {
    return `This action updates a #${id} wrapup`;
  }

  remove(id: number) {
    return `This action removes a #${id} wrapup`;
  }
}
