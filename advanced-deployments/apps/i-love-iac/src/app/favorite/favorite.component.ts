import { Component, OnInit } from '@angular/core';
import { Movie } from '@advanced-deployments/api-interfaces';
import { FavoriteService } from './favorite.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'advanced-deployments-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteMovies$: Observable<
    Movie[]
  > = this.favService.myFavorites$.asObservable();

  constructor(private favService: FavoriteService) {}

  ngOnInit(): void {
    this.favService.loadFavorites();
  }

  removeFromFavorite(movie: Movie) {
    this.favService.removeFromFavorites(movie);
  }
}
