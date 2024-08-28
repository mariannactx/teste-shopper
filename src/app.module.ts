import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UploadService } from './services/upload.service';
import { ConfirmService } from './services/confirm.service';
import { ListService } from './services/list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MeasureEntity } from './entities/measure.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: 'root',
      password: '0123456789',
      database: 'shopper',
      synchronize: false,
      entities: [MeasureEntity],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([MeasureEntity]),
  ],
  controllers: [AppController],
  providers: [UploadService, ConfirmService, ListService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
