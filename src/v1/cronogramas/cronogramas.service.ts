import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class CronogramasService {constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll(limit: number, offset: number): Promise<any[]> {
    const sqlQuery = `
        SELECT * FROM cronogramas
        LIMIT ? OFFSET ?`;
    return this.entityManager.query(sqlQuery, [limit, offset]);
  }

  async findAllBefore(limit: number, offset: number): Promise<any[]> {
    const sqlQuery = `
         SELECT * FROM cronogramas WHERE start >= NOW()
          LIMIT ? OFFSET ?`;
    return this.entityManager.query(sqlQuery, [limit, offset]);
  }

  
}

