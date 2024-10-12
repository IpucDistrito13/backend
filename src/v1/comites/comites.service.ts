import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class ComitesService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  // Método para paginación
  async findAll(limit: number, offset: number): Promise<any[]> {
    const sqlQuery = `
      SELECT * FROM comites_view
      ORDER BY id ASC
      LIMIT ? OFFSET ?`;

    return this.entityManager.query(sqlQuery, [limit, offset]);
  }

  // Método para búsqueda
  async search(query: string, limit: number, offset: number): Promise<any[]> {
    const sqlQuery = `
      SELECT  *
      FROM 
        comites comites_view
      WHERE c.nombre LIKE ?
      LIMIT ? OFFSET ?`;

    return this.entityManager.query(sqlQuery, [`%${query}%`, limit, offset]);
  }

 

  async searchById(id: number): Promise<any[]> {
    const sqlQuery = `
      SELECT * FROM comites_view 
      WHERE id = ?`;

    return this.entityManager.query(sqlQuery, [id]);
  }
}


/*
SELECT c.*, 
       img.id AS image_id, 
       img.url AS image_url
FROM comites c
LEFT JOIN images img 
ON img.imageable_id = c.id 
AND img.imageable_type = 'App\\Models\\Comite'
      LIMIT ? OFFSET ?

CREATE VIEW comites_view AS SELECT c.*, 
       img.id AS image_id, 
       img.url AS image_url
FROM comites c
LEFT JOIN images img 
ON img.imageable_id = c.id 
AND img.imageable_type = 'App\\Models\\Comite'
*/