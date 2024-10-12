import { Controller, Get } from '@nestjs/common';
import { TransmisionesService } from './transmisiones.service';

@Controller('api/v1/transmision')
export class TransmisionesController {
  constructor(private readonly transmisionesService: TransmisionesService) {}

  @Get('/envivo')
  async searchTransmision() {
    const podcasts = await this.transmisionesService.searchTransmision();
  
    if (podcasts.length === 0) {
      return {}; // Si no hay resultados, devuelve un objeto vacío
    }
  
    // Si solo necesitas devolver el primer podcast
    const podcast = podcasts[0];
  
    const data = {
      id: Number(podcast.id),
      url: podcast.url || '', // Asegúrate de manejar el caso donde no haya URL
    };
  
    return data; // Devuelve el objeto directamente
  }
  
}
