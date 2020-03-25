import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'news-detail/:id',
    loadChildren: () => import('./news-detail/news-detail.module').then((m: any) => m.NewsDetailModule)
  },
  {
    path: 'news-edit/:id',
    loadChildren: () => import('./news-edit/news-edit.module').then((m: any) => m.NewsEditModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
