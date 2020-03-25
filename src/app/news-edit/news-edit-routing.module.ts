import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsEditComponent } from './news-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NewsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsEditRoutingModule { }
