import { Injectable, HttpService } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { UtellyLookupResponse } from '../models/utelly.interfaces';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable, combineLatest } from 'rxjs';
import { Movie, ImdbMovie } from '@advanced-deployments/api-interfaces';

@Injectable()
export class MovieService {
  constructor(private httpService: HttpService) {}

  searchForMovies(term: string, country: string): Observable<Movie[]> {
    return this.httpService
      .get<UtellyLookupResponse>(environment.utelly.endpoint, {
        params: {
          term,
          country
        },
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': environment.utelly.host,
          'x-rapidapi-key': environment.rapidapiKey
        }
      })
      .pipe(
        map(data => data.data.results),
        switchMap(moviesResponse =>
          combineLatest(
            moviesResponse.map(movie => this.getImdbInformation(movie))
          )
        ),
        map(movies => {
          return movies.map(movie => {
            movie.locations = movie.locations.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            return movie;
          });
        })
      );
  }

  private getImdbInformation(movie: Movie): Observable<Movie> {
    if (!movie.external_ids?.imdb?.id) {
      return of(movie);
    } else {
      return this.httpService
        .get<ImdbMovie>(
          `${environment.imdb.endpoint}/film/${movie.external_ids.imdb.id}`,
          {
            headers: {
              'content-type': 'application/octet-stream',
              'x-rapidapi-host': environment.imdb.host,
              'x-rapidapi-key': environment.rapidapiKey
            }
          }
        )
        .pipe(
          map(imdbMovieDataResponse => {
            movie.external_ids.imdb.data = imdbMovieDataResponse.data;
            return movie;
          })
        );
    }
  }
}
