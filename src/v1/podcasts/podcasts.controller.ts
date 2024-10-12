import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';

@Controller('api/v1/')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get('podcasts')
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;

    const podcasts = await this.podcastsService.findAll(
      limitNumber,
      offsetNumber,
    );

    // Mapeo de la estructura de la respuesta
    const data = podcasts.map((podcast) => ({
      id: Number(podcast.id),
      slug: podcast.slug,
      nombre: podcast.titulo,
      imagenportada: podcast.image_url || '', // Asegúrate de que este campo coincida con la consulta SQL
    }));

    return { data };
  }

  @Get('podcast/:id') // Ruta para buscar por id
  async findOne(@Param('id') id: number, @Res() res) {
    try {
      // Realiza la consulta según la instrucción proporcionada
      const podcats = await this.podcastsService.searchById(id); // La consulta debe realizar la SELECT aquí

      if (podcats.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Podcats no encontrado' });
      }

      // Asumiendo que solo hay un resultado, mapea el primero a la estructura requerida
      const podcastData = podcats[0];

      const responseData = {
        data: {
          id: Number(podcastData.id),
          type: 'podcast', // Tipo de recurso
          nombre: podcastData.titulo,
          slug: podcastData.slug,
          descripcion: podcastData.descripcion,
          contenido: podcastData.contenido,
          imagenportada: podcastData.image_url || '',
        },
      };

      return res.status(HttpStatus.OK).json(responseData);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error al buscar el comité' });
    }
  }

  @Get('podcasts/comite/:id') // Ruta para buscar por id
  async findOneComite(@Param('id') id: number, @Res() res) {
    try {
      // Realiza la consulta según la instrucción proporcionada
      const podcasts = await this.podcastsService.searchByComiteId(id); // La consulta debe realizar la SELECT aquí

      if (podcasts.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Podcasts no encontrado' });
      }

      // Asumiendo que hay múltiples resultados, puedes mapear todos
      const responseData = {
        data: podcasts.map((podcast) => ({
          id: Number(podcast.id),
          slug: podcast.slug,
          nombre: podcast.titulo,
          descripcion: podcast.descripcion,
          imagenportada: podcast.image_url || '', // Asegúrate de que este campo esté presente en la respuesta
          categoria: podcast.categoria, // Asegúrate de que este campo esté en el resultado
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
