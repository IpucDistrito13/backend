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
      SELECT  *
      FROM 
        comites comites_view
      LIMIT ? OFFSET ?`;
  
    return this.entityManager.query(sqlQuery, [limit, offset]);
  }
  
  

  // Método para búsqueda
  async search(query: string, limit: number, offset: number): Promise<any[]> {
    const sqlQuery = `
      ELECT  *
      FROM 
        comites comites_view
      WHERE c.nombre LIKE ?
      LIMIT ? OFFSET ?`;

    return this.entityManager.query(sqlQuery, [`%${query}%`, limit, offset]);
  }
}
