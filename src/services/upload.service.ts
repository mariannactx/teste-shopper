import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppRepository } from 'src/app.repository';
import { UploadBody } from 'src/dtos/uploadBody';
import { MeasureEntity } from 'src/entities/measure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  private repository: BaseRepository;

  constructor(
    @InjectRepository(MeasureEntity)
    private measuresRepository: Repository<MeasureEntity>,
  ) {
    this.repository = new AppRepository(this.measuresRepository);
  }

  async execute(body: UploadBody): Promise<UploadResponse> {
    const { measure_datetime, measure_type, customer_code, image } = body;

    const measuresOfMonth = await this.repository.findByMonthType(
      measure_datetime,
      measure_type,
    );

    if (measuresOfMonth.length) {
      throw new HttpException(
        'Leitura do mês já realizada',
        HttpStatus.CONFLICT,
      );
    }

    const measure = await this.repository.save({
      customer_code,
      measure_datetime,
      measure_type,
      image_url: '',
      measure_value: 10,
    });

    return {
      image_url: measure.image_url,
      measure_value: measure.measure_value,
      measure_uuid: measure._id,
    };
  }
}
