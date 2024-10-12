import { Controller, Get, Query } from '@nestjs/common';
import { EventosService } from './eventos.service';

@Controller('api/v1/')
export class EventosController {

    constructor(private readonly eventosService: EventosService) {}

  @Get('eventos')
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;
  
    const eventos = await this.eventosService.findAll(limitNumber, offsetNumber);
  
    // Mapeo de la estructura de la respuesta
    const data = eventos.map((evento) => ({
      id: Number(evento.id),
      nombre: evento.title,
      start: evento.start,
      end: evento.end,
      lugar: evento.lugar,
      descripcion: evento.descripcion,
      url: evento.url,

    }));
  
    return { data };
  }

  @Get('eventos/before')
  async findAllBefore(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;
  
    const eventos = await this.eventosService.findAll(limitNumber, offsetNumber);
  
    // Mapeo de la estructura de la respuesta
    const data = eventos.map((evento) => ({
      id: Number(evento.id),
      nombre: evento.nombre,
      start: evento.start,
      end: evento.end,
      lugar: evento.lugar,
      descripcion: evento.descripcion,
      url: evento.url,

    }));
  
    return { data };
  }
}
