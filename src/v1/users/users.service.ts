import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll(): Promise<any[]> {
    return this.entityManager.query('SELECT * FROM users'); // Consulta SQL directa
  }
}
