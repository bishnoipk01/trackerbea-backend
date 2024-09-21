import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determine the status code
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    // Default message
    let message = 'Internal server error';

    // Check if the error is an instance of HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors (like unique constraint violations)
      if (exception.code === 'P2002') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Duplicate value for unique field. Please check your data.';
      }
    }

    // In development mode, include detailed information
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorResponse = {
      statusCode: status,
      message,
      ...(isDevelopment && {
        error: exception instanceof Error ? exception.stack : exception,
      }),
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    // Send the response to the client
    response.status(status).json(errorResponse);
  }
}
