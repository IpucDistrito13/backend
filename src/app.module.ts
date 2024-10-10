import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule
import { DepartamentosModule } from './v1/departamentos/departamentos.module';
import { UsersController } from './v1/users/users.controller';
import { UsersService } from './v1/users/users.service';
import { UsersModule } from './v1/users/users.module';
import { CongregacionesController } from './v1/congregaciones/congregaciones.controller';
import { CongregacionesService } from './v1/congregaciones/congregaciones.service';
import { CongregacionesModule } from './v1/congregaciones/congregaciones.module';
import { ComitesController } from './v1/comites/comites.controller';
import { ComitesService } from './v1/comites/comites.service';
import { ComitesModule } from './v1/comites/comites.module';
import { LideresController } from './v1/lideres/lideres.controller';
import { LideresService } from './v1/lideres/lideres.service';
import { LideresModule } from './v1/lideres/lideres.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno sean accesibles en toda la aplicación
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST, // Accede a la variable de entorno
        port: +process.env.DB_PORT, // Convierte a número
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Solo para desarrollo
      }),
    }),
    DepartamentosModule,
    UsersModule,
    CongregacionesModule,
    ComitesModule,
    LideresModule,
  ],
  controllers: [UsersController, CongregacionesController, ComitesController, LideresController],
  providers: [UsersService, CongregacionesService, ComitesService, LideresService],
})
export class AppModule {}
