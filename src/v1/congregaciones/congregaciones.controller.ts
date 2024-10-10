import { Controller, Get, Query } from '@nestjs/common';
import { CongregacionesService } from './congregaciones.service';

@Controller('api/v1/congregaciones')
export class CongregacionesController {
  constructor(private readonly congregacionesService: CongregacionesService) {}

  @Get()
  async findAll(
    @Query('limit') limit: string,  
    @Query('offset') offset: string,
    @Query('query') query?: string, // Agregar el parámetro de búsqueda
  ) {
    // Convertir los parámetros a número y establecer valores por defecto
    const limitNumber = parseInt(limit) || 10; 
    const offsetNumber = parseInt(offset) || 0; 

    const congregaciones = await this.congregacionesService.findAll(limitNumber, offsetNumber, query); // Pasar el query al servicio

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
        fotocongregacion: 'public/congregaciones/Vd8KmxFxCZ70iJ3Elwvo1oDXbjdCBtvBvxZc6sEn.webp',
    }));

    return { data };
  }
  
  @Get('search') // Nuevo endpoint para búsqueda
  async search(
    @Query('query') query: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const limitNumber = parseInt(limit) || 10;
    const offsetNumber = parseInt(offset) || 0;

    const congregaciones = await this.congregacionesService.search(query, limitNumber, offsetNumber);

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
        fotocongregacion: 'public/congregaciones/Vd8KmxFxCZ70iJ3Elwvo1oDXbjdCBtvBvxZc6sEn.webp',
    }));

    return { data };
  }
}
