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
import { SlidersController } from './v1/sliders/sliders.controller';
import { SlidersService } from './v1/sliders/sliders.service';
import { SlidersModule } from './v1/sliders/sliders.module';
import { PodcastsController } from './v1/podcasts/podcasts.controller';
import { PodcastsService } from './v1/podcasts/podcasts.service';
import { PodcastsModule } from './v1/podcasts/podcasts.module';
import { SeriesController } from './v1/series/series.controller';
import { SeriesService } from './v1/series/series.service';
import { SeriesModule } from './v1/series/series.module';
import { EventosController } from './v1/eventos/eventos.controller';
import { EventosService } from './v1/eventos/eventos.service';
import { EventosModule } from './v1/eventos/eventos.module';
import { CronogramasController } from './v1/cronogramas/cronogramas.controller';
import { CronogramasService } from './v1/cronogramas/cronogramas.service';
import { CronogramasModule } from './v1/cronogramas/cronogramas.module';
import { TransmisionesController } from './v1/transmisiones/transmisiones.controller';
import { TransmisionesService } from './v1/transmisiones/transmisiones.service';
import { TransmisionesModule } from './v1/transmisiones/transmisiones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno sean accesibles en toda la aplicación
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST, 
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, 
      }),
    }),
    DepartamentosModule,
    UsersModule,
    CongregacionesModule,
    ComitesModule,
    LideresModule,
    SlidersModule,
    PodcastsModule,
    SeriesModule,
    EventosModule,
    CronogramasModule,
    TransmisionesModule,
  ],
  controllers: [UsersController, CongregacionesController, ComitesController, LideresController, SlidersController, PodcastsController, SeriesController, EventosController, CronogramasController, TransmisionesController],
  providers: [UsersService, CongregacionesService, ComitesService, LideresService, SlidersService, PodcastsService, SeriesService, EventosService, CronogramasService, TransmisionesService],
})
export class AppModule {}
