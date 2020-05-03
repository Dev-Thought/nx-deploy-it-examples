import { Injectable } from '@nestjs/common';
import { FavoriteEntity } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Movie } from '@advanced-deployments/api-interfaces';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favRepository: MongoRepository<FavoriteEntity>
  ) {}

  async getFavorites() {
    return this.favRepository.find();
  }

  async addFavorite(movie: Movie, userId: string) {
    const favorites = await this.favRepository.findOne({ userId });
    if (!favorites.movies.find(m => m.id === movie.id)) {
      favorites.movies.push(movie);
      return this.favRepository.save(favorites);
    }
  }
}
