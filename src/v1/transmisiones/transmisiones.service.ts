import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransmisionesService {
    constructor(
      @InjectEntityManager() private readonly entityManager: EntityManager,
    ) {}
  
    async searchTransmision(): Promise<any[]> {
      const sqlQuery = `
          SELECT * FROM redes WHERE id = 4`;
      return this.entityManager.query(sqlQuery);
    }
}