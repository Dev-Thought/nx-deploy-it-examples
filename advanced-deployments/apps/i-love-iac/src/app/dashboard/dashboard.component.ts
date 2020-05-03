import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Movie, SearchDto } from '@advanced-deployments/api-interfaces';
import { environment } from '../../environments/environment';
import { FavoriteService } from '../favorite/favorite.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'advanced-deployments-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  movies$: Observable<Movie[]>;

  constructor(
    private http: HttpClient,
    private favoriteService: FavoriteService
  ) {}

  searchForMovies(term: string, country: string) {
    const body: SearchDto = {
      term,
      country
    };
    this.movies$ = combineLatest([
      this.http.post<Movie[]>(`${environment.apiEndpoint}/search`, body),
      this.favoriteService.myFavorites$
    ]).pipe(
      map(([movies, favorites]) => {
        return movies.map(movie => {
          favorites.forEach(favMovie => {
            if (movie.id === favMovie.id) {
              movie.isFav = true;
            }
          });
          return movie;
        });
      })
    );
  }

  addToFavorite(movie: Movie) {
    this.favoriteService.addToFavorite(movie);
  }
}
