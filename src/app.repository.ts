import { randomUUID, UUID } from 'crypto';
import { Repository } from 'typeorm';
import { MeasureEntity } from './entities/measure.entity';
import { MeasureDTO } from './dtos/measureDTO';

export class AppRepository implements BaseRepository {
  constructor(private measuresRepository: Repository<MeasureEntity>) {}

  find(): Promise<MeasureEntity[]> {
    return this.measuresRepository.find();
  }

  findById(id: UUID) {
    return this.measuresRepository.findOneByOrFail({ _id: id });
  }

  findByMonthType(
    datetime: string,
    type: MeasureTypes,
  ): Promise<MeasureEntity[]> {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return this.measuresRepository.manager
      .getMongoRepository(MeasureEntity)
      .aggregate([
        {
          $project: {
            year: { $year: '$measure_datetime' },
            month: { $month: '$measure_datetime' },
            measure_type: 1,
          },
        },
        {
          $match: { year, month, measure_type: type },
        },
      ])
      .toArray();
  }

  async save(data: MeasureDTO): Promise<MeasureEntity> {
    const uuid = randomUUID();
    const measure: MeasureEntity = {
      _id: uuid,
      customer_code: data.customer_code,
      measure_datetime: new Date(data.measure_datetime),
      measure_type: data.measure_type,
      has_confirmed: false,
      image_url: `${data.image_url}/images/${uuid}`,
      measure_value: data.measure_value,
      image: data.image,
      image_type: data.image_type,
    };

    return await this.measuresRepository.save(measure);
  }
}
