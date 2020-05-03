import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie, SearchDto } from '@advanced-deployments/api-interfaces';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post('search')
  search(@Body() body: SearchDto): Observable<Movie[]> {
    return this.movieService.searchForMovies(body.term, body.country);
  }
}
