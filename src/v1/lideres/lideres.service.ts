import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class LideresService {
    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager,
      ) {}
    
      async findAll(limit: number, offset: number): Promise<any[]> {
        const sqlQuery = `
          SELECT * FROM lideres_view
          LIMIT ? OFFSET ?`;
        return this.entityManager.query(sqlQuery, [limit, offset]);
      }
      
    
      async search(query: string, limit: number = 10, offset: number): Promise<any[]> {
        const sqlQuery = `
          SELECT * FROM lideres_view
          AND (nombre LIKE ? OR direccion LIKE ?)
          LIMIT ? OFFSET ?`;
        return this.entityManager.query(sqlQuery, [`%${query}%`, `%${query}%`, limit, offset]);
      }

      async searchLideresByComiteId(id: number): Promise<any[]> {
        const sqlQuery = `
          SELECT * FROM lideres_view 
          WHERE comite_id = ?`;
    
        return this.entityManager.query(sqlQuery, [id]);
      }

      
    
      
    }
