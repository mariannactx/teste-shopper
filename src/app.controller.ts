import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { ConfirmService } from './services/confirm.service';
import { ListService } from './services/list.service';
import { UploadBody } from './dtos/uploadBody';
import { ConfirmBody } from './dtos/confirmBody';

@Controller()
export class AppController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly confirmService: ConfirmService,
    private readonly listService: ListService,
  ) {}

  @Get('healthcheck')
  healthcheck(): string {
    return 'ok';
  }

  @Post('upload')
  async createUser(
    @Body(new ValidationPipe({ transform: true })) body: UploadBody,
  ): Promise<string> {
    return JSON.stringify(await this.uploadService.execute(body));
  }

  @Patch('confirm')
  async transfer(@Body() body: ConfirmBody): Promise<any> {
    return await this.confirmService.execute(body);
  }

  @Get(':customer/list')
  async list(
    @Param() params: { customer: string },
    @Query() query: { measure_type: MeasureTypes },
  ): Promise<string> {
    return await this.listService.execute(params.customer, query.measure_type);
  }
}
