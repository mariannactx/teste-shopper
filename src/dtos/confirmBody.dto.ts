import { IsNumber, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ConfirmBodyDTO {
  @IsUUID()
  measure_uuid: UUID;

  @IsNumber()
  confirmed_value: number;
}
