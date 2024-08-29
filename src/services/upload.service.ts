import { GoogleGenerativeAI } from '@google/generative-ai';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppRepository } from 'src/app.repository';
import { detectMimeType } from 'src/utils';
import { UploadBodyDTO } from 'src/dtos/uploadBody.dto';
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

  async execute(body: UploadBodyDTO, baseUrl: string): Promise<UploadResponse> {
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

    const mimeType = detectMimeType(image);

    let generatedText;
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = 'Read numbers on the meter and return only the numbers';

      const generatedContent = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: image,
            mimeType,
          },
        },
      ]);

      generatedText = generatedContent.response.text();
    } catch (e: unknown) {
      throw new HttpException(
        'Erro ao ler imagem.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!generatedText) {
      throw new HttpException(
        'Erro ao ler imagem.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const onlyNumbers = generatedText.match(/^\d*/);

    if (!onlyNumbers || !onlyNumbers[0].length) {
      throw new HttpException(
        'Erro ao ler imagem.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const measure = await this.repository.save({
      customer_code,
      measure_datetime,
      measure_type,
      measure_value: onlyNumbers[0],
      image_url: baseUrl,
      image: image,
      image_type: mimeType,
    });

    return {
      image_url: measure.image_url,
      measure_value: measure.measure_value,
      measure_uuid: measure._id,
    };
  }
}
