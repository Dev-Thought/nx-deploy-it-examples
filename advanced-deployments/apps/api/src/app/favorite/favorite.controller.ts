import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Movie } from '@advanced-deployments/api-interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  favorites() {
    return this.favoriteService.getFavorites();
  }

  @Post()
  addFavorite(@Body() movie: Movie) {
    const userId = 'abcd1244';
    console.log(movie, userId);
    return this.favoriteService.addFavorite(movie, userId);
  }
}
