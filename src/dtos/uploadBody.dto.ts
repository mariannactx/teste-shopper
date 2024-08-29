import { IsBase64, IsEnum, IsISO8601, IsString } from 'class-validator';

const measureTypesEnum: Record<MeasureTypes, MeasureTypes> = {
  WATER: 'WATER',
  GAS: 'GAS',
};

export class UploadBodyDTO {
  @IsBase64()
  image: string;

  @IsString()
  customer_code: string;

  @IsISO8601()
  measure_datetime: string;

  @IsEnum(measureTypesEnum)
  measure_type: MeasureTypes;
}
