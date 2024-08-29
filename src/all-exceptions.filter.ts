import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

const errorCodes: PartialRecord<HttpStatus, string> = {
  400: 'INVALID_DATA',
  500: 'INTERNAL_SERVER_ERROR',
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    let status, code, description;

    if (exception['status'] == undefined) {
      status = 500;
      code = errorCodes[status];
      description = 'Ocorreu um erro.';
    } else {
      status = exception['status'];
      code = description = exception['response']['code']
        ? exception['response']['code']
        : errorCodes[status];
      description = exception['response']['message']
        ? exception['response']['message']
        : exception['response'];
    }

    const error = new HttpException(
      {
        error_code: code,
        error_description: description,
      },
      status,
    );

    super.catch(error, host);
  }
}
