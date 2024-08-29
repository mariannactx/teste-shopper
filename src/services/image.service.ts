import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppRepository } from 'src/app.repository';
import { MeasureEntity } from 'src/entities/measure.entity';
import { Readable } from 'stream';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  private repository: BaseRepository;

  constructor(
    @InjectRepository(MeasureEntity)
    private measuresRepository: Repository<MeasureEntity>,
  ) {
    this.repository = new AppRepository(this.measuresRepository);
  }

  async execute(id: string): Promise<{
    fileStream: Readable;
    type: string;
  }> {
    const measure = await this.repository.findById(id);

    if (!measure) {
      throw new HttpException('Leitura não encontrada', HttpStatus.NOT_FOUND);
    }
    const fileBuffer = Buffer.from(measure.image, 'base64');
    const fileStream = Readable.from(fileBuffer);

    return { fileStream, type: measure.image_type };
  }
}
