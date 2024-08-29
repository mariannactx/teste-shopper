import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppRepository } from 'src/app.repository';
import { ConfirmBodyDTO } from 'src/dtos/confirmBody.dto';
import { MeasureEntity } from 'src/entities/measure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfirmService {
  private repository: BaseRepository;

  constructor(
    @InjectRepository(MeasureEntity)
    private measuresRepository: Repository<MeasureEntity>,
  ) {
    this.repository = new AppRepository(this.measuresRepository);
  }

  async execute(body: ConfirmBodyDTO): Promise<string> {
    const measure: Measure = await this.repository.findById(body.measure_uuid);

    if (!measure) {
      throw new HttpException(
        {
          code: 'MEASURE_NOT_FOUND',
          message: 'Leitura não encontrada',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (measure.has_confirmed) {
      throw new HttpException(
        {
          code: 'CONFIRMATION_DUPLICATE',
          message: 'Leitura do mês já confirmada',
        },
        HttpStatus.CONFLICT,
      );
    }

    const result = await this.repository.confirm(
      body.measure_uuid,
      body.confirmed_value,
    );

    if (!result.affected) {
      throw new HttpException(
        'Ocorreu um erro',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return '{ "success": true }';
  }
}
