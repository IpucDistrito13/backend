import { Module } from '@nestjs/common';
import { CongregacionesController } from './congregaciones.controller';
import { CongregacionesService } from './congregaciones.service';

@Module({
  providers: [CongregacionesService],
  controllers: [CongregacionesController],
})
export class CongregacionesModule {}
