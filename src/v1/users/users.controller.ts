import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly congregacionesService: UsersService) {}

  //http://localhost:3000/productosQuery?limit=100&offset=50&marca=Nike
  @Get('paginate')
  ProductosQuery(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return `Los parámetros son limit: ${limit}, offset: ${offset}. `;
  }

  @Get()
  async findAll() {
    const congregaciones = await this.congregacionesService.findAll();

    // Mapear la estructura de la respuesta
    const data = congregaciones.map((congregacion) => ({
      id: Number(congregacion.id), // Convertimos el ID a número
      uuid: null, // Este campo está estático en null
      congregacion: congregacion.nombre, // Cambiamos el campo 'nombre' a 'congregacion'
      municipio: congregacion.municipio, // Valor estático de ejemplo
      departamento: congregacion.departamento, // Valor estático de ejemplo
      direccion: congregacion.direccion,
      longitud: congregacion.longitud,
      latitud: congregacion.latitud,
      urlfacebook: congregacion.urlfacebook,
      googlemaps: congregacion.googlemaps,
      fotocongregacion:
        'public/congregaciones/Vd8KmxFxCZ70iJ3Elwvo1oDXbjdCBtvBvxZc6sEn.webp', // Valor estático de ejemplo
    }));

    return { data }; // Envolvemos la respuesta dentro del campo "data"
  }
}
