import { HttpException, HttpStatus } from '@nestjs/common';

export const throwEmailAlreadyExistsException = () => {
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: 'User with such e-mail already exists',
    },
    HttpStatus.BAD_REQUEST,
  );
};
