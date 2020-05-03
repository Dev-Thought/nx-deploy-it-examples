import { Injectable } from '@angular/core';
import { Movie } from '@advanced-deployments/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  myFavorites$ = new ReplaySubject<Movie[]>(1);

  constructor(private http: HttpClient) {
    this.loadFavorites();
  }

  loadFavorites() {
    this.http
      .get<Movie[]>(`${environment.apiEndpoint}/favorites`)
      .subscribe(favorites => this.myFavorites$.next(favorites));
  }

  addToFavorite(movie: Movie) {
    this.http
      .post<Movie[]>(`${environment.apiEndpoint}/favorites`, movie)
      .pipe(first())
      .subscribe(movies => this.myFavorites$.next(movies));
  }

  removeFromFavorites(movie: Movie) {
    this.http
      .delete<Movie[]>(`${environment.apiEndpoint}/favorites/${movie.id}`)
      .pipe(first())
      .subscribe(movies => this.myFavorites$.next(movies));
  }
}
