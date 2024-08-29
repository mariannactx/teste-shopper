import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req as Request,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { UploadService } from './services/upload.service';
import { ConfirmService } from './services/confirm.service';
import { ListService } from './services/list.service';
import { ImageService } from './services/image.service';
import { UploadBodyDTO } from './dtos/uploadBody.dto';
import { ConfirmBodyDTO } from './dtos/confirmBody.dto';
import { UUID } from 'crypto';

@Controller()
export class AppController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly confirmService: ConfirmService,
    private readonly listService: ListService,
    private readonly imageService: ImageService,
  ) {}

  @Get('healthcheck')
  healthcheck(): string {
    return 'ok';
  }

  @Post('upload')
  async createUser(
    @Body(new ValidationPipe({ transform: true })) body: UploadBodyDTO,
    @Request() req: Req,
  ): Promise<string> {
    const baseUrl = `${req.protocol}://${req.get('Host')}`;
    return JSON.stringify(await this.uploadService.execute(body, baseUrl));
  }

  @Patch('confirm')
  async transfer(
    @Body(new ValidationPipe({ transform: true })) body: ConfirmBodyDTO,
  ): Promise<any> {
    return await this.confirmService.execute(body);
  }

  @Get(':customer/list')
  async list(
    @Param() params: { customer: string },
    @Query() query: { measure_type: MeasureTypes },
  ): Promise<string> {
    return await this.listService.execute(params.customer, query.measure_type);
  }

  @Get('images/:id')
  async getFile(
    @Param() params: { id: UUID },
    @Response() res: Res,
  ): Promise<void> {
    const { fileStream, type } = await this.imageService.execute(params.id);

    res.setHeader('Content-Type', type);
    fileStream.pipe(res);
  }
}
