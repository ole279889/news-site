import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './news-detail.component';
import { NewsDetailRoutingModule } from './news-detail-routing.module';
import { TextWindowComponent } from '../common/text-window/text-window.component';

@NgModule({
  declarations: [
    NewsDetailComponent,
    TextWindowComponent,
  ],
  imports: [
    CommonModule,
    NewsDetailRoutingModule,
  ]
})
export class NewsDetailModule { }

