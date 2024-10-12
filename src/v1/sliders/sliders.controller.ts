import { Controller, Get, Query } from '@nestjs/common';
import { SlidersService } from './sliders.service';

@Controller('api/v1')
export class SlidersController {
  constructor(private readonly slidersService: SlidersService) {}

  @Get('sliders')
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    // Convertir los parámetros a número y establecer valores por defecto
    const limitNumber = parseInt(limit) || 10;
    const offsetNumber = parseInt(offset) || 0;

    const sliders = await this.slidersService.findAll(limitNumber, offsetNumber);

    // Mapear la estructura de la respuesta
    const data = sliders.map((slider) => ({
        id: Number(slider.id),
        nombre: slider.titulo,  // Assuming titulo is a string
        imagen: slider.url,  // Assuming titulo is a string
    }));

    return { data };
  }
}

