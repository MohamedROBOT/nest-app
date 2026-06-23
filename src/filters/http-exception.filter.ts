import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const stack = exception.stack;
    const exceptionResponse: any = exception.getResponse();
    response.status(status).json({
      success: false,
      message,
      errors: exceptionResponse.errors,
      stack: process.env.NODE_ENV === 'development' ? stack : undefined,
    });
  }
}
