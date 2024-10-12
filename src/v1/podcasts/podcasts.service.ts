import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class PodcastsService {
    constructor(
      @InjectEntityManager() private readonly entityManager: EntityManager,
    ) {}
  
    async findAll(limit: number, offset: number): Promise<any[]> {
      const sqlQuery = `
        SELECT * FROM podcasts_view
        LIMIT ? OFFSET ?`;
      return this.entityManager.query(sqlQuery, [limit, offset]);
    }
    
  
    async searchById(id: number): Promise<any[]> {
        const sqlQuery = `
          SELECT * FROM podcasts_view 
          WHERE id = ?`;
    
        return this.entityManager.query(sqlQuery, [id]);
      }

      async searchByComiteId(id: number): Promise<any[]> {
        const sqlQuery = `
          SELECT * FROM podcasts_view 
          WHERE comite_id = ?`;
    
        return this.entityManager.query(sqlQuery, [id]);
      }
  
    
  }


/*
CREATE VIEW podcasts_view AS
SELECT 
    podcasts.id AS podcast_id,
    podcasts.slug,
    podcasts.titulo,
    podcasts.descripcion,
    podcasts.contenido,
    podcasts.comite_id AS podcast_comite_id, -- Renombramos esta columna para evitar el conflicto
    podcasts.categoria_id AS podcast_categoria_id, -- Renombramos esta columna para evitar el conflicto
    comites.id AS comite_id,
    comites.nombre AS comite_nombre,
    categorias.id AS categoria_id,
    categorias.nombre AS categoria_nombre,
    images.url AS imagen_portada
FROM 
    podcasts
INNER JOIN 
    comites ON podcasts.comite_id = comites.id -- Relación con comites
INNER JOIN 
    categorias ON podcasts.categoria_id = categorias.id -- Relación con categorias
LEFT JOIN 
    images ON images.imageable_id = podcasts.id AND images.imageable_type = 'App\\Models\\Podcast';

*/