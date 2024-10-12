import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { CongregacionesService } from './congregaciones.service';

@Controller('api/v1/congregaciones')
export class CongregacionesController {
  constructor(private readonly congregacionesService: CongregacionesService) {}

  @Get()
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    // Convertir los parámetros a número y establecer valores por defecto
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;

    const congregaciones = await this.congregacionesService.findAll(
      limitNumber,
      offsetNumber,
    );
    // Mapear la estructura de la respuesta
    const data = congregaciones.map((congregacion) => ({
      id: Number(congregacion.id),
      uuid: null,
      congregacion: congregacion.nombre,
      municipio: congregacion.municipio,
      departamento: congregacion.departamento,
      direccion: congregacion.direccion,
      longitud: congregacion.longitud,
      latitud: congregacion.latitud,
      urlfacebook: congregacion.urlfacebook,
      googlemaps: congregacion.googlemaps,
      fotocongregacion: congregacion.fotocongregacion,
    }));

    return { data };
  }

  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {

    // Convertir los parámetros a número y establecer valores por defecto
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;

    const congregaciones = await this.congregacionesService.search(query, limitNumber, offsetNumber);

    // Mapear la estructura de la respuesta
    const data = congregaciones.map((congregacion) => ({
      id: Number(congregacion.id),
      uuid: null,
      congregacion: congregacion.nombre,
      municipio: congregacion.municipio,
      departamento: congregacion.departamento,
      direccion: congregacion.direccion,
      longitud: congregacion.longitud,
      latitud: congregacion.latitud,
      urlfacebook: congregacion.urlfacebook,
      googlemaps: congregacion.googlemaps,
      fotocongregacion: congregacion.fotocongregacion,
    }));

    return { data };
  }
}
