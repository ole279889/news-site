import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsEditComponent } from './news-edit.component';
import { NewsEditRoutingModule } from './news-edit-routing.module';

@NgModule({
  declarations: [NewsEditComponent],
  imports: [
    CommonModule,
    NewsEditRoutingModule,
  ]
})
export class NewsEditModule { }

