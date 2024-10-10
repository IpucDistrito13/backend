import { Controller, Get, Query } from '@nestjs/common';
import { ComitesService } from './comites.service';

@Controller('api/v2/comites')
export class ComitesController {
  constructor(private readonly comitesService: ComitesService) {}

  @Get() async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    // Convertir los parámetros a número y establecer valores por defecto
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;

    const comites = await this.comitesService.findAll(
      limitNumber,
      offsetNumber,
      
    ); // Pasar el query al servicio
    // Mapear la estructura de la respuesta
    
    const data = comites.map((comites) => ({
      id: Number(comites.id),
      slug: comites.slug,
      nombre: comites.nombre,
      imagenportada: comites.imagenportada,
    }));

    return { data };
  }
}
