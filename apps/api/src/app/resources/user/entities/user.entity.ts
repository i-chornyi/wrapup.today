import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash } from 'bcryptjs';
import { RefreshTokenEntity } from '../../auth/refresh-token/entities/refresh-token.entity';

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

  @Column()
  email: string;

  @Column({ nullable: true, default: null })
  @Exclude()
  password: string;

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  refreshTokens: RefreshTokenEntity[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
