import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WrapupEntity } from '../../wrapup/entities/wrapup.entity';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => WrapupEntity, (wrapup) => wrapup.project)
  wrapups: WrapupEntity[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
