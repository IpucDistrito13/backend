import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { LideresService } from './lideres.service';

@Controller('api/v1/lideres')
export class LideresController {
  constructor(private readonly lideresService: LideresService) {}

  @Get()
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    // Convertir los parámetros a número y establecer valores por defecto
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;

    const lideres = await this.lideresService.findAll(
      limitNumber,
      offsetNumber,
    );
    // Mapear la estructura de la respuesta
    const data = lideres.map((lider) => ({
      id: Number(lider.lider_id),
      uuid: lider.uuid,
      nombre: lider.nombre,
      apellidos: lider.apellidos,
      celular: lider.celular,
      imagenperfil: lider.imagenperfil,
      tipolider: lider.tipolider,
      visiblecelular: lider.visiblecelular,
    }));

    return { data };
  }

  @Get('/comite/:id') // Ruta para buscar por id
  async findOneComite(@Param('id') id: number, @Res() res) {
    try {
      // Realiza la consulta según la instrucción proporcionada
      const podcasts = await this.lideresService.searchLideresByComiteId(id); // La consulta debe realizar la SELECT aquí

      if (podcasts.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Lideres no encontrado' });
      }

      // Asumiendo que hay múltiples resultados, puedes mapear todos
      const responseData = {
        data: podcasts.map((lider) => ({
          id: Number(lider.id),
          type: 'Lider',
          uuid: lider.uuid,
          nombre: lider.nombre,
          apellidos: lider.apellidos,
          celular: lider.celular,
          imagenperfil: lider.imagen_url ??  'public/No_imagen/no_image_portada.png',
          tipolider: lider.tipo_nombre,
          visiblecelular: lider.visible_celular,
        })),
      };

      return res.status(HttpStatus.OK).json(responseData);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error al buscar el comité' });
    }
  }
}
