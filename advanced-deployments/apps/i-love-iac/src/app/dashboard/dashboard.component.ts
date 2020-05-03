import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Movie, SearchDto } from '@advanced-deployments/api-interfaces';
import { environment } from '../../environments/environment';

@Component({
  selector: 'advanced-deployments-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  movies$: Observable<Movie[]>;

  constructor(private http: HttpClient) {}

  searchForMovies(term: string, country: string) {
    const body: SearchDto = {
      term,
      country
    };
    this.movies$ = this.http.post<Movie[]>(
      `${environment.apiEndpoint}/search`,
      body
    );
  }
}
