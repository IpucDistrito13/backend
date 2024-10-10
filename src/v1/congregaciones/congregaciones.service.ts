import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class CongregacionesService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll(limit: number = 10, offset: number, query?: string): Promise<any[]> {
    if (query) {
      return this.search(query, limit, offset); // Si hay un query, llama al método de búsqueda
    }

    return this.entityManager.query(
      `SELECT c.*, m.id AS municipio_id, m.nombre AS municipio, d.id AS departamento_id, d.nombre AS departamento
       FROM congregaciones c
       JOIN municipios m ON c.municipio_id = m.id
       JOIN departamentos d ON m.departamento_id = d.id
       WHERE c.estado = 'Activo'
       LIMIT ? OFFSET ?`,
      [limit, offset],
    );
  }

  async search(query: string, limit: number = 10, offset: number): Promise<any[]> {
    return this.entityManager.query(
      `SELECT c.*, m.id AS municipio_id, m.nombre AS municipio, d.id AS departamento_id, d.nombre AS departamento
       FROM congregaciones c
       JOIN municipios m ON c.municipio_id = m.id
       JOIN departamentos d ON m.departamento_id = d.id
       WHERE c.estado = 'Activo' AND c.nombre LIKE ?
       LIMIT ? OFFSET ?`,
      [`%${query}%`, limit, offset], // Usar LIKE para buscar por nombre
    );
  }
}
