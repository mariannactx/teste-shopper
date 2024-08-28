import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

const errorCodes: PartialRecord<HttpStatus, string> = {
  400: 'INVALID_DATA',
  409: 'DOUBLE_REPORT',
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const status = exception['status'];
    const description = exception['response']['message']
      ? exception['response']['message']
      : exception['response'];

    const error = new HttpException(
      {
        error_code: errorCodes[status],
        error_description: description,
      },
      exception['status'],
    );

    super.catch(error, host);
  }
}
