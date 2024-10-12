import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { SeriesService } from './series.service';

@Controller('api/v1/')
export class SeriesController {
    constructor(private readonly podcastsService: SeriesService) {}

  @Get('series')
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;
  
    const series = await this.podcastsService.findAll(limitNumber, offsetNumber);
  
    // Mapeo de la estructura de la respuesta
    const data = series.map((serie) => ({
      id: Number(serie.id),
      slug: serie.slug,
      nombre: serie.titulo,
      imagenportada: serie.image_url || '', // Asegúrate de que este campo coincida con la consulta SQL
      categoria: serie.categoria,

    }));
  
    return { data };
  }

  @Get('serie/:id') // Ruta para buscar por id
  async findOne(@Param('id') id: number, @Res() res) {
    try {
      // Realiza la consulta según la instrucción proporcionada
      const podcats = await this.podcastsService.searchById(id); // La consulta debe realizar la SELECT aquí

      if (podcats.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Series no encontrado' });
      }

      // Asumiendo que solo hay un resultado, mapea el primero a la estructura requerida
      const serieData = podcats[0];

      const responseData = {
        data: {
          id: Number(serieData.id),
          slug: serieData.slug,
          type: 'serie', // Tipo de recurso
          nombre: serieData.titulo,
          descripcion: serieData.descripcion,
          contenido: serieData.contenido,
          imagenportada: serieData.image_url || '', 
          categoria: serieData.categoria, //Cambiarlo por categoria

        },
      };

      return res.status(HttpStatus.OK).json(responseData);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error al buscar el comité' });
    }
  }

  @Get('series/comite/:id') // Ruta para buscar por id
async findOneComite(@Param('id') id: number, @Res() res) {
  try {
    // Realiza la consulta según la instrucción proporcionada
    const podcasts = await this.podcastsService.searchByComiteId(id); // La consulta debe realizar la SELECT aquí

    if (podcasts.length === 0) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Serie no encontrado' });
    }

    // Asumiendo que hay múltiples resultados, puedes mapear todos
    const responseData = {
      data: podcasts.map((podcast) => ({
        id: Number(podcast.id),
        slug: podcast.slug,
        nombre: podcast.titulo,
        descripcion: podcast.descripcion,
        imagenportada: podcast.image_url || '', 
        categoria: podcast.categoria 
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

