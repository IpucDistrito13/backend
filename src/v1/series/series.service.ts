import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class SeriesService {
    constructor(
      @InjectEntityManager() private readonly entityManager: EntityManager,
    ) {}
  
    async findAll(limit: number, offset: number): Promise<any[]> {
      const sqlQuery = `
        SELECT * FROM series_view
        LIMIT ? OFFSET ?`;
      return this.entityManager.query(sqlQuery, [limit, offset]);
    }
    
  
    async searchById(id: number): Promise<any[]> {
        const sqlQuery = `
          SELECT * FROM series_view 
          WHERE id = ?`;
    
        return this.entityManager.query(sqlQuery, [id]);
      }

      async searchByComiteId(id: number): Promise<any[]> {
        const sqlQuery = `
          SELECT * FROM series_view 
          WHERE comite_id = ?`;
    
        return this.entityManager.query(sqlQuery, [id]);
      }
  
    
  }


