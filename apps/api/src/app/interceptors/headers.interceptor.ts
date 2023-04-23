import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    context
      .switchToHttp()
      .getResponse()
      .setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URI);

    return next.handle();
  }
}
