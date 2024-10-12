import { Controller, Get, Param, Res, HttpStatus, Query } from '@nestjs/common';
import { ComitesService } from './comites.service';

@Controller('api/v1/')
export class ComitesController {
  constructor(private readonly comitesService: ComitesService) {}

  @Get('comites')
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const limitNumber = parseInt(limit) || 40;
    const offsetNumber = parseInt(offset) || 0;
  
    const comites = await this.comitesService.findAll(limitNumber, offsetNumber);
  
    // Mapeo de la estructura de la respuesta
    const data = comites.map((comiteData) => ({
      id: Number(comiteData.id),
      slug: comiteData.slug,
      nombre: comiteData.nombre,
      imagenportada: comiteData.image_url || '', // Asegúrate de que este campo coincida con la consulta SQL
    }));
  
    return { data };
  }
  

  @Get('comite/:id') // Ruta para buscar por id
  async findOne(@Param('id') id: number, @Res() res) {
    try {
      // Realiza la consulta según la instrucción proporcionada
      const comite = await this.comitesService.searchById(id); // La consulta debe realizar la SELECT aquí

      if (comite.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Comité no encontrado' });
      }

      // Asumiendo que solo hay un resultado, mapea el primero a la estructura requerida
      const comiteData = comite[0];

      const responseData = {
        data: {
          id: Number(comiteData.id),
          type: 'comite', // Tipo de recurso
          nombre: comiteData.nombre,
          descripcion: comiteData.descripcion, // Asegúrate de que 'descripcion' esté disponible en la consulta
          imagenportada: comiteData.image_url || '', // Asegúrate de que este campo esté presente en la respuesta
          //**imagenbanner: comiteData.imagenbanner || ''  // Asegúrate de que este campo esté presente en la respuesta
          //imagenportada: '',
          imagenbanner: '',
        },
      };

      return res.status(HttpStatus.OK).json(responseData);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error al buscar el comité' });
    }
  }
}
