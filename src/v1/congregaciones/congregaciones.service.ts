import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class CongregacionesService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll(limit: number, offset: number): Promise<any[]> {
    const sqlQuery = `
      SELECT * FROM congregaciones_view
      ORDER BY id ASC
      LIMIT ? OFFSET ?`;
    return this.entityManager.query(sqlQuery, [limit, offset]);
  }
  

  async search(query: string, limit: number = 10, offset: number): Promise<any[]> {
    const sqlQuery = `
      SELECT * FROM congregaciones_view
      WHERE estado = 'Activo' 
      AND (nombre LIKE ? OR direccion LIKE ?)
      LIMIT ? OFFSET ?`;
    return this.entityManager.query(sqlQuery, [`%${query}%`, `%${query}%`, limit, offset]);
  }

  
}
