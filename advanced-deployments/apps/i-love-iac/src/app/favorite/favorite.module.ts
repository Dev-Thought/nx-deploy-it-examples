import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { RouterModule, Route } from '@angular/router';

const routes: Route[] = [{ path: '', component: FavoriteComponent }];

@NgModule({
  declarations: [FavoriteComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class FavoriteModule {}
