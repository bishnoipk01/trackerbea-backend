import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Logger } from 'winston'; // Assuming you're using winston

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;

    const now = Date.now();

    return next.handle().pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tap((response) => {
        const duration = Date.now() - now;
        this.logger.info({
          message: `Request to ${method} ${url} succeeded`,
          responseTime: `${duration}ms`,
          statusCode: context.switchToHttp().getResponse().statusCode,
        });
      }),
      catchError((error) => {
        const duration = Date.now() - now;
        this.logger.error({
          message: `Request to ${method} ${url} failed`,
          responseTime: `${duration}ms`,
          errorMessage: error.message,
          stack: error.stack,
          statusCode: context.switchToHttp().getResponse().statusCode,
        });
        throw error; // Re-throw the error for other handlers
      }),
    );
  }
}
