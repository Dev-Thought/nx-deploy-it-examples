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
        map(movies =>
          movies.map(movie => {
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
          })
        )
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

const movies: Movie[] = [
  {
    id: '5d9140ed302b840050acf5e6',
    picture:
      'https://utellyassets9-1.imgix.net/api/Images/dd5c0e80aa2c467413fa89289e2aab76/Redirect',
    name: 'Highlander',
    locations: [
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/iTunesIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'iTunes',
        name: 'iTunesIVAUS',
        id: '5d80a9a5d51bef861d3740d3',
        url:
          'https://itunes.apple.com/us/tv-season/warmonger/id307585260?i=308728963'
      },
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonInstantVideoIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'Amazon Instant Video',
        name: 'AmazonInstantVideoIVAUS',
        id: '5d82609332ac2f0051962fe6',
        url:
          'https://www.amazon.com/gp/product/B002RCR2CS?creativeASIN=B002RCR2CS&ie=UTF8&linkCode=xm2&tag=utellycom00-21'
      },
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/GooglePlayIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'Google Play',
        name: 'GooglePlayIVAUS',
        id: '5d8260b128fbcd0052aed197',
        url:
          'https://play.google.com/store/tv/show?amp=&amp=&cdid=tvseason-jnD4ZoJbGler8Uj2Ts18ow&gdid=tvepisode-RgVAeRKf_Yw&gl=US&hl=en&id=DckuXNvRdPM'
      },
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonPrimeVideoIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'Amazon Prime Video',
        name: 'AmazonPrimeVideoIVAUS',
        id: '5d8257243ed3f000513540ec',
        url:
          'https://www.amazon.com/gp/product/B07FVYQXCX?creativeASIN=B07FVYQXCX&ie=UTF8&linkCode=xm2&tag=utellycom00-21'
      }
    ],
    provider: 'iva',
    weight: 8044,
    external_ids: {
      iva_rating: null,
      imdb: {
        url: 'https://www.imdb.com/title/tt0103442',
        id: 'tt0103442'
      },
      tmdb: { url: 'https://www.themoviedb.org/movie/4414', id: '4414' },
      wiki_data: {
        url: 'https://www.wikidata.org/wiki/Q1520493',
        id: 'Q1520493'
      },
      iva: { id: '348259' },
      gracenote: null,
      rotten_tomatoes: null,
      facebook: null
    }
  },
  {
    id: '5e2ce0b890c0e033a488068d',
    picture:
      'https://utellyassets9-1.imgix.net/api/Images/af3330f67872c6aff8d119f443be27a9/Redirect',
    name: 'Highlander',
    locations: [
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonPrimeVideoIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'Amazon Prime Video',
        name: 'AmazonPrimeVideoIVAUS',
        id: '5d8257243ed3f000513540ec',
        url:
          'https://www.amazon.com/gp/product/B079NQW3J8?creativeASIN=B079NQW3J8&ie=UTF8&linkCode=xm2&tag=utellycom00-21'
      },
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/GooglePlayIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'Google Play',
        name: 'GooglePlayIVAUS',
        id: '5d8260b128fbcd0052aed197',
        url:
          'https://play.google.com/store/movies/details/Highlander?gl=US&hl=en&id=rZkNE02ei5k'
      },
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonInstantVideoIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'Amazon Instant Video',
        name: 'AmazonInstantVideoIVAUS',
        id: '5d82609332ac2f0051962fe6',
        url:
          'https://www.amazon.com/gp/product/B0051E9JNE?creativeASIN=B0051E9JNE&ie=UTF8&linkCode=xm2&tag=utellycom00-21'
      },
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/iTunesIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'iTunes',
        name: 'iTunesIVAUS',
        id: '5d80a9a5d51bef861d3740d3',
        url: 'https://itunes.apple.com/us/movie/highlander/id431215034'
      }
    ],
    provider: 'iva',
    weight: 0,
    external_ids: {
      iva_rating: null,
      imdb: {
        url: 'https://www.imdb.com/title/tt0091203',
        id: 'tt0091203'
      },
      tmdb: { url: 'https://www.themoviedb.org/movie/8009', id: '8009' },
      wiki_data: {
        url: 'https://www.wikidata.org/wiki/Q156539',
        id: 'Q156539'
      },
      iva: { id: '196' },
      gracenote: null,
      rotten_tomatoes: null,
      facebook: null
    }
  },
  {
    id: '5e2ce0b890c0e033a4880690',
    picture:
      'https://utellyassets9-1.imgix.net/api/Images/a099970c98e6de9ba9f0369f0062ae4c/Redirect',
    name: 'Highlander: Endgame',
    locations: [
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/iTunesIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'iTunes',
        name: 'iTunesIVAUS',
        id: '5d80a9a5d51bef861d3740d3',
        url: 'https://itunes.apple.com/us/movie/highlander-endgame/id476962357'
      }
    ],
    provider: 'iva',
    weight: 0,
    external_ids: {
      iva_rating: null,
      imdb: {
        url: 'https://www.imdb.com/title/tt0144964',
        id: 'tt0144964'
      },
      tmdb: { url: 'https://www.themoviedb.org/movie/12211', id: '12211' },
      wiki_data: {
        url: 'https://www.wikidata.org/wiki/Q1617964',
        id: 'Q1617964'
      },
      iva: { id: '807021' },
      gracenote: null,
      rotten_tomatoes: null,
      facebook: null
    }
  },
  {
    id: '5e6808c4a0aa2fbabd3bf5b1',
    picture:
      'https://utellyassets9-1.imgix.net/api/Images/aff43ac9d187b96822bb55b2e4e59966/Redirect',
    name: 'Highlander: The Animated Series',
    locations: [
      {
        icon:
          'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonInstantVideoIVAUS.png?w=92&auto=compress&app_version=ae3576e2-0796-4eda-b953-80cadc8e2619_eww2020-05-02',
        display_name: 'Amazon Instant Video',
        name: 'AmazonInstantVideoIVAUS',
        id: '5d82609332ac2f0051962fe6',
        url:
          'https://www.amazon.com/gp/product/B07CYZTPYW?creativeASIN=B07CYZTPYW&ie=UTF8&linkCode=xm2&tag=utellycom00-21'
      }
    ],
    provider: 'iva',
    weight: 0,
    external_ids: {
      iva_rating: null,
      imdb: {
        url: 'https://www.imdb.com/title/tt0147773',
        id: 'tt0147773'
      },
      tmdb: { url: 'https://www.themoviedb.org/movie/12304', id: '12304' },
      wiki_data: {
        url: 'https://www.wikidata.org/wiki/Q1617959',
        id: 'Q1617959'
      },
      iva: null,
      gracenote: null,
      rotten_tomatoes: null,
      facebook: null
    }
  }
];
