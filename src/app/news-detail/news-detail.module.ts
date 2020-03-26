import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './news-detail.component';
import { NewsDetailRoutingModule } from './news-detail-routing.module';
import { TextWindowModule } from '../common/text-window/text-window.component';
import { CompileDirectiveModule } from '../shared/directives/compile.directive';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    NewsDetailComponent,
  ],
  imports: [
    CommonModule,
    NewsDetailRoutingModule,
    CompileDirectiveModule,
    MatIconModule,
    TextWindowModule
  ]
})
export class NewsDetailModule { }

