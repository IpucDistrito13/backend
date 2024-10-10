import { Module } from '@nestjs/common';
import { LideresService } from './lideres.service';
import { LideresController } from './lideres.controller';

@Module({
    providers: [LideresService],
    controllers: [LideresController],
})
export class LideresModule {}
