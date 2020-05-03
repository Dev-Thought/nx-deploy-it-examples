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

  async getFavorites(userId: string) {
    return (await this.favRepository.findOne({ userId })).movies;
  }

  async addFavorite(movie: Movie, userId: string) {
    let favorites = await this.favRepository.findOne({ userId });
    if (!favorites) {
      favorites = new FavoriteEntity();
      favorites.movies = [];
      favorites.userId = userId;
    }
    if (!favorites.movies.find(m => m.id === movie.id)) {
      favorites.movies.push(movie);
      return (await this.favRepository.save(favorites)).movies;
    }
    return favorites.movies;
  }

  async removeFavorite(movieId: string, userId: string) {
    const favorites = await this.favRepository.findOne({ userId });
    favorites.movies = favorites.movies.filter(movie => movie.id !== movieId);
    return (await this.favRepository.save(favorites)).movies;
  }
}
