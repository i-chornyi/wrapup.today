import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserByEmailAndPasswordDto,
  CreateUserByGoogleDataDto,
} from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './entities/user.entity';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';
import { AvatarSettingsService } from '../avatar-settings/avatar-settings.service';
import { UpdateUserDto } from './dto/update-user.dto';

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

  getProfile(id: UserEntity['id']): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail({
      where: { id },
      relations: ['avatar'],
    });
  }

  async updateProfile(id: UserEntity['id'], body: UpdateUserDto): Promise<any> {
    return this.usersRepository
      .createQueryBuilder('users')
      .update()
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
      })
      .where('id = :id', { id })
      .execute();
  }

  async createUserByEmailAndPassword(
    body: CreateUserByEmailAndPasswordDto,
    res?: Response,
  ) {
    const possibleExistingUser = await this.findOneByEmail(body.email);

    if (possibleExistingUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'User with such e-mail already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = await this.usersRepository.create({
      ...body,
    });
    const newUser = await this.usersRepository.save(createdUser);

    const userAvatar = await this.avatarSettingsService.create(newUser);

    newUser.avatar = userAvatar;

    const newUserWithAvatar = await this.usersRepository.save(newUser);

    if (res && res.statusCode === 201) {
      res.on('finish', () => {
        this.mailService.sendUserConfirmation(newUserWithAvatar);
      });
    }

    return this.authService.login(newUserWithAvatar);
  }

  async createUserByGoogleData(
    body: CreateUserByGoogleDataDto,
    res?: Response,
  ) {
    await this.checkIfPossibleUserExists(body.email);

    const createdUser = await this.usersRepository.create({
      googleId: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    });

    if (res && res.statusCode === 201) {
      res.on('finish', () => {
        this.mailService.sendUserConfirmation(createdUser);
      });
    }

    const newUser = await this.usersRepository.save(createdUser);

    const userAvatar = await this.avatarSettingsService.create(newUser);

    newUser.avatar = userAvatar;

    return this.usersRepository.save(newUser);
  }

  async checkIfPossibleUserExists(email: UserEntity['email']) {
    const possibleExistingUser = await this.findOneByEmail(email);

    if (possibleExistingUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'User with such e-mail already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
