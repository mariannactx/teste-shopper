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
  500: 'INTERNAL_SERVER_ERROR',
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);

    let status, description;

    if (exception['status'] == undefined) {
      status = 500;
      description = 'Ocorreu um erro.';
    } else {
      status = exception['status'];
      description = exception['response']['message']
        ? exception['response']['message']
        : exception['response'];
    }

    const error = new HttpException(
      {
        error_code: errorCodes[status],
        error_description: description,
      },
      status,
    );

    super.catch(error, host);
  }
}
