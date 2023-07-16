import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { hash } from 'bcryptjs';
import { ProjectEntity } from '../../project/entities/project.entity';
import { RefreshTokenEntity } from '../../auth/refresh-token/entities/refresh-token.entity';
import { AvatarSettingEntity } from '../../avatar-settings/entities/avatar-setting.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: null })
  @Exclude()
  googleId: string;

  @Column({ nullable: true, default: null })
  firstName: string;

  @Column({ nullable: true, default: null })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, default: null })
  @Exclude()
  password: string;

  @OneToMany(() => ProjectEntity, (project) => project.owner, {
    onDelete: 'CASCADE',
  })
  projects: ProjectEntity[];

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  refreshTokens: RefreshTokenEntity[];

  @OneToOne(() => AvatarSettingEntity, (avatar) => avatar.user, {
    cascade: true,
  })
  avatar: AvatarSettingEntity;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Expose()
  get isProfileComplete(): boolean {
    return !!this.firstName;
  }

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
