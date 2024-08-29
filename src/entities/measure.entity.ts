import { UUID } from 'crypto';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('measures')
export class MeasureEntity implements Measure {
  @ObjectIdColumn()
  _id: UUID;

  @Column()
  customer_code: string;

  @Column()
  measure_datetime: Date;

  @Column()
  measure_type: MeasureTypes;

  @Column()
  has_confirmed: boolean;

  @Column()
  image_url: string;

  @Column()
  measure_value: number;

  @Column()
  image: string;

  @Column()
  image_type: string;
}
