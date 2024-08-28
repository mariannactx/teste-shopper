import { Injectable } from '@nestjs/common';

@Injectable()
export class ListService {
  execute(customer: string, measure_type?: MeasureTypes): string {
    return 'Hello World!';
  }
}
