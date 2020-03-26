import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsEditComponent } from './news-edit.component';
import { ChangesGuard } from '../shared/guards/chandes.guard';

const routes: Routes = [
  {
    path: '',
    component: NewsEditComponent,
    canDeactivate: [ChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsEditRoutingModule { }
