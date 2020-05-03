import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovieModule } from './movie/movie.module';
import { environment } from '../environments/environment';
import { FavoriteModule } from './favorite/favorite.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: environment.mongo.uri,
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
      autoLoadEntities: true,
      useUnifiedTopology: true
    }),
    MovieModule,
    FavoriteModule,
    AuthzModule
  ]
})
export class AppModule {}
