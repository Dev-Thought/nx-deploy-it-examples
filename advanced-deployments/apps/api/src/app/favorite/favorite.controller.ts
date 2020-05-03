import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Movie } from '@advanced-deployments/api-interfaces';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../authz/user.decorator';
import { User as UserData } from '../models/user.interface';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  favorites(@User() user: UserData) {
    return this.favoriteService.getFavorites(user.sub);
  }

  @Post()
  addFavorite(@Body() movie: Movie, @User() user: UserData) {
    return this.favoriteService.addFavorite(movie, user.sub);
  }

  @Delete(':movieId')
  removeFavorite(@Param('movieId') movieId: string, @User() user: UserData) {
    return this.favoriteService.removeFavorite(movieId, user.sub);
  }
}
