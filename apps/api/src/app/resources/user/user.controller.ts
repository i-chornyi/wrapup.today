import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserByEmailAndPasswordDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import { AppRequest } from '@wrapup/api-interfaces';
import { setAccessAndRefreshTokensToCookies } from '../auth/utils/cookies.util';
import { UpdateUserDto } from './dto/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AppRequest) {
    return this.userService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@Req() req: AppRequest, @Body() body: UpdateUserDto) {
    return this.userService.updateProfile(req.user.userId, body);
  }

  @Post('')
  async register(
    @Res() res: Response,
    @Body() body: CreateUserByEmailAndPasswordDto,
  ) {
    const tokens = await this.userService.createUserByEmailAndPassword(
      body,
      res,
    );

    if (tokens) {
      setAccessAndRefreshTokensToCookies(res, tokens);
      res.send({ result: 'ok' });
    } else {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
