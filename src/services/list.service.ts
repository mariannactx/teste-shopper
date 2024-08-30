import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppRepository } from 'src/app.repository';
import { ListResponseDTO } from 'src/dtos/listResponse.dto';
import { MeasureEntity } from 'src/entities/measure.entity';
import { isMeasureType } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
  private repository: BaseRepository;

  constructor(
    @InjectRepository(MeasureEntity)
    private measuresRepository: Repository<MeasureEntity>,
  ) {
    this.repository = new AppRepository(this.measuresRepository);
  }

  async execute(
    customer_code: string,
    measure_type?: MeasureTypes,
  ): Promise<ListResponseDTO[]> {
    let measures: MeasureEntity[];
    if (measure_type) {
      if (!isMeasureType(measure_type)) {
        throw new HttpException(
          {
            code: 'INVALID_TYPE',
            message: 'Tipo de medição não permitida',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      measures = await this.repository.findByCustomerAndType(
        customer_code,
        measure_type,
      );
    } else {
      measures = await this.repository.findByCustomer(customer_code);
    }

    if (!measures || !measures.length) {
      throw new HttpException(
        {
          code: 'MEASURES_NOT_FOUND',
          message: 'Nenhuma leitura encontrada',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return measures.map((measure) => ({
      measure_uuid: measure._id,
      measure_datetime: measure.measure_datetime.toISOString(),
      measure_type: measure.measure_type,
      has_confirmed: measure.has_confirmed,
      image_url: measure.image_url,
    }));
  }
}
