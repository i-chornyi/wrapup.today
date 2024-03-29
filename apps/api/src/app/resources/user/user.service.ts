import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserByEmailAndPasswordDto,
  CreateUserByGoogleDataDto,
} from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '@wrapup/db-entities';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';
import { AvatarSettingsService } from '../avatar-settings/avatar-settings.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SuccessResponse, UserProfile } from '@wrapup/api-interfaces';
import { throwEmailAlreadyExistsException } from '../../throwables/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private mailService: MailService,
    @Inject(forwardRef(() => AvatarSettingsService))
    private avatarSettingsService: AvatarSettingsService,
  ) {}

  async findOneById(id: UserEntity['id']): Promise<UserEntity | undefined> {
    return this.usersRepository.findOneOrFail({
      where: { id },
    });
  }

  async findOneByEmail(
    email: UserEntity['email'],
  ): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getProfile(id: UserEntity['id']): Promise<UserProfile> {
    const userProfile = await this.usersRepository.findOneOrFail({
      where: { id },
      relations: ['avatar'],
    });

    return {
      id: userProfile.id,
      email: userProfile.email,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      isProfileComplete: userProfile.isProfileComplete,
      createdAt: userProfile.createdAt.toISOString(),
      updatedAt: userProfile.updatedAt.toISOString(),
      avatar: {
        angle: userProfile.avatar.angle,
        colors: userProfile.avatar.colors,
      },
    } as UserProfile;
  }

  async updateProfile(
    id: UserEntity['id'],
    body: UpdateUserDto,
  ): Promise<SuccessResponse> {
    const result = await this.usersRepository
      .createQueryBuilder('users')
      .update()
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
      })
      .where('id = :id', { id })
      .execute();

    if (result.affected > 0) {
      return {
        result: 'ok',
        message: 'User profile was successfully updated.',
      };
    }

    throw new HttpException(
      { message: 'Something went wrong. User profile could not be updated.' },
      HttpStatus.BAD_REQUEST,
    );
  }

  async createUserByEmailAndPassword(
    body: CreateUserByEmailAndPasswordDto,
    res?: Response,
  ) {
    const avatar = this.avatarSettingsService.generateAvatarEntity();

    const createdUser = this.usersRepository.create({ ...body, avatar });

    try {
      const user = await this.usersRepository.save(createdUser);

      if (res && res.statusCode === 201) {
        res.on('finish', () => {
          this.mailService.sendUserConfirmation(user);
        });
      }

      const tokens = await this.authService.login(user);
      return { tokens, user };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.detail.includes('email')
      ) {
        throwEmailAlreadyExistsException();
      }
    }
  }

  async createUserByGoogleData(
    body: CreateUserByGoogleDataDto,
    res?: Response,
  ) {
    const avatar = this.avatarSettingsService.generateAvatarEntity();

    const createdUser = await this.usersRepository.create({
      googleId: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      avatar,
    });

    if (res && res.statusCode === 201) {
      res.on('finish', () => {
        this.mailService.sendUserConfirmation(createdUser);
      });
    }

    return this.usersRepository.save(createdUser);
  }
}
