import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getData(): string {
    return 'ok';
  }
}
