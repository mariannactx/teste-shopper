import { Injectable } from '@nestjs/common';
import { ConfirmBodyDTO } from 'src/dtos/confirmBody.dto';

@Injectable()
export class ConfirmService {
  execute(body: ConfirmBodyDTO): string {
    return 'Hello World!';
  }
}
