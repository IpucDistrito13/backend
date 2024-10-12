import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class EventosService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll(limit: number, offset: number): Promise<any[]> {
    const sqlQuery = `
        SELECT * FROM eventos
        LIMIT ? OFFSET ?`;
    return this.entityManager.query(sqlQuery, [limit, offset]);
  }

  async findAllBefore(limit: number, offset: number): Promise<any[]> {
    const sqlQuery = `
         SELECT * FROM eventos WHERE start >= CURDATE()
          LIMIT ? OFFSET ?`;
    return this.entityManager.query(sqlQuery, [limit, offset]);
  }
}
