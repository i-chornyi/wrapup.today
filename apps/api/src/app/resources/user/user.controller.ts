import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserByEmailAndPasswordDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import { AppRequest } from '@wrapup/api-interfaces';
import { setAccessAndRefreshTokensToCookies } from '../auth/utils/cookies.util';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AppRequest) {
    return this.userService.findOneById(req.user.userId);
  }

  @Post('')
  async register(
    @Res() res: Response,
    @Body() body: CreateUserByEmailAndPasswordDto,
  ) {
    const tokens = await this.userService.createUserByEmailAndPassword(body);

    if (tokens) {
      setAccessAndRefreshTokensToCookies(res, tokens);
      res.send({ result: 'ok' });
    } else {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
