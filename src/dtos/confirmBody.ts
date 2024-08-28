import { UUID } from 'crypto';

export class ConfirmBody {
  measure_uuid: UUID;
  confirmed_value: number;
}
