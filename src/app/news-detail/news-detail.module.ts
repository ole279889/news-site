import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './news-detail.component';
import { NewsDetailRoutingModule } from './news-detail-routing.module';
import { TextWindowComponent } from '../common/text-window/text-window.component';
import { DecodePipe } from '../shared/pipes/decode.pipe';
import { CompileDirectiveModule } from '../shared/directives/compile.directive';

@NgModule({
  declarations: [
    NewsDetailComponent,
    TextWindowComponent,
    DecodePipe,
  ],
  imports: [
    CommonModule,
    NewsDetailRoutingModule,
    CompileDirectiveModule,
  ]
})
export class NewsDetailModule { }

