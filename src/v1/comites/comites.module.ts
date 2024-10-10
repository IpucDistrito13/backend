import { Module } from '@nestjs/common';
import { ComitesService } from './comites.service';
import { ComitesController } from './comites.controller';

@Module({
    providers: [ComitesService],
    controllers: [ComitesController],
  })
export class ComitesModule {}
