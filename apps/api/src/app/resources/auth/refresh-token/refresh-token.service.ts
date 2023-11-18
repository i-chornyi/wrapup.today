import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { RefreshTokenEntity, UserEntity } from '@wrapup/db-entities';
import { UserService } from '../../user/user.service';
import { DateTime } from 'luxon';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private refreshTokensRepository: Repository<RefreshTokenEntity>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createToken(userId: UserEntity['id']) {
    const token = this.generateJWTFromUserEntity(
      {
        id: userId,
        email: undefined,
      },
      60 * 60 * 24 * 7,
    );

    const newRefreshToken = this.refreshTokensRepository.create({
      token,
      userId,
      expiresAt: DateTime.now().plus({ day: 7 }).toUTC().toISO(),
    });

    await this.refreshTokensRepository.save(newRefreshToken);

    return token;
  }

  findTokensByUserId(userId: UserEntity['id']) {
    return this.refreshTokensRepository.findBy({ userId });
  }

  findNonexpiredTokensByUserId(userId: UserEntity['id']) {
    return this.refreshTokensRepository.findBy({
      userId,
      expiresAt: MoreThanOrEqual(DateTime.now().toUTC().toJSDate()),
    });
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const userId: UserEntity['id'] =
        this.jwtService.verify(refreshToken)?.userId;

      if (userId) {
        const storedUserTokens = await this.findNonexpiredTokensByUserId(
          userId,
        );

        if (storedUserTokens.some((token) => refreshToken === token.token)) {
          const user: UserEntity = await this.userService.findOneById(userId);

          return this.generateAccessAndRefreshTokens(user);
        }
      }
    } catch (e) {
      return null;
    }
  }

  async generateAccessAndRefreshTokens(user: Pick<UserEntity, 'id' | 'email'>) {
    const accessToken = this.generateJWTFromUserEntity(user);
    const refreshToken = await this.createToken(user.id);

    return { accessToken, refreshToken };
  }

  generateJWTFromUserEntity(
    user: Pick<UserEntity, 'id' | 'email'>,
    expiresIn = 20 * 60,
  ): string {
    const payload = { email: user.email, userId: user.id };

    return this.jwtService.sign(payload, { expiresIn });
  }
}
