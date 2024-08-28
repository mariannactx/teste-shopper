import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfirmService {
  execute(body: ConfirmBody): string {
    return 'Hello World!';
  }
}
