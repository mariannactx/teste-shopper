import { Injectable } from '@nestjs/common';
import { ConfirmBody } from 'src/dtos/confirmBody';

@Injectable()
export class ConfirmService {
  execute(body: ConfirmBody): string {
    return 'Hello World!';
  }
}
