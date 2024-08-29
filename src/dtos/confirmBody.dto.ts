import { UUID } from 'crypto';

export class ConfirmBodyDTO {
  measure_uuid: UUID;
  confirmed_value: number;
}
