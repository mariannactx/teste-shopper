interface Measure {
  _id: UUID;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureTypes;
  has_confirmed: boolean;
  image_url: string;
  measure_value: number;
  image: string;
  image_type: string;
}
