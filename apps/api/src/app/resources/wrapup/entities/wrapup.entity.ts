import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from '../../project/entities/project.entity';

@Entity('wrapups')
export class WrapupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProjectEntity, (project) => project.wrapups, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;

  @Column()
  projectId: ProjectEntity['id'];

  @Column()
  done: string;

  @Column()
  planned: string;

  @Column()
  blockers: string;

  @Column({ type: 'timestamptz' })
  day: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
