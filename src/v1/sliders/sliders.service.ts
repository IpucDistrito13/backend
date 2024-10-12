import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class SlidersService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  // Método para paginación
  async findAll(limit: number, offset: number): Promise<any[]> {
    const sqlQuery = `
    SELECT * 
    FROM sliders_view
    WHERE estado = 'Activo'
    LIMIT ? OFFSET ?`;

    return this.entityManager.query(sqlQuery, [limit, offset]);
  }
}

/*

CREATE VIEW sliders_view AS
SELECT 
  sliders.id,
  sliders.titulo,  
  images.url
FROM 
  sliders
LEFT JOIN 
  images 
ON 
  images.imageable_id = sliders.id 
  AND images.imageable_type = 'App\\Models\\Slider'
WHERE 
  sliders.estado = 'Activo';

  //
CREATE VIEW sliders_view AS SELECT 
  sliders.id,
  sliders.titulo,  
  images.url
  sliders.estado
FROM 
  sliders
LEFT JOIN 
  images 
ON 
  images.imageable_id = sliders.id 
  AND images.imageable_type = 'App\\Models\\Slider'
WHERE 
  sliders.estado = 'Activo';

*/
