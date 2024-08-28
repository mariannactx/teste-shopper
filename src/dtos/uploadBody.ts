import { IsBase64, IsEnum, IsISO8601 } from 'class-validator';

const measureTypesEnum: Record<MeasureTypes, MeasureTypes> = {
  WATER: 'WATER',
  GAS: 'GAS',
};

export class UploadBody {
  @IsBase64()
  image: string;

  customer_code: string;

  @IsISO8601()
  measure_datetime: string;

  @IsEnum(measureTypesEnum)
  measure_type: MeasureTypes;
}
