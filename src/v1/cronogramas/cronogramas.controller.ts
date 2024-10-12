import { Controller, Get, Query } from '@nestjs/common';
import { CronogramasService } from './cronogramas.service';

@Controller('api/v1/')
export class CronogramasController {
    constructor(private readonly cronogramasService: CronogramasService) {}

  @Get('cronogramas')
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;
  
    const cronogramas = await this.cronogramasService.findAll(limitNumber, offsetNumber);
  
    // Mapeo de la estructura de la respuesta
    const data = cronogramas.map((cronograma) => ({
      id: Number(cronograma.id),
      nombre: cronograma.title,
      start: cronograma.start,
      end: cronograma.end,
      lugar: cronograma.lugar,
      descripcion: cronograma.descripcion,
      url: cronograma.url,

    }));
  
    return { data };
  }

  @Get('cronogramas/before')
  async findAllBefore(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;
  
    const cronogramas = await this.cronogramasService.findAll(limitNumber, offsetNumber);
  
    // Mapeo de la estructura de la respuesta
    const data = cronogramas.map((cronograma) => ({
      id: Number(cronograma.id),
      nombre: cronograma.nombre,
      start: cronograma.start,
      end: cronograma.end,
      lugar: cronograma.lugar,
      descripcion: cronograma.descripcion,
      url: cronograma.url,

    }));
  
    return { data };
  }
}

