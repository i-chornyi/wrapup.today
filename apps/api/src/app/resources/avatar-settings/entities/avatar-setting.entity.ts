import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity('avatar_settings')
export class AvatarSettingEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  angle: string;

  @Column({
    type: 'varchar',
    length: 23,
    transformer: {
      to: (value: string[]) => value.join(';'),
      from: (value: string) => {
        if (value) {
          return value.split(';');
        }
        return [];
      },
    },
  })
  colors: string[];

  @OneToOne(() => UserEntity, (user) => user.avatar, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  updatedAt: Date;
}
