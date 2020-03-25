import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsEditComponent } from './news-edit.component';
import { NewsEditRoutingModule } from './news-edit-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { TextWindowComponent } from '../common/text-window/text-window.component';
import { DecodePipe } from '../shared/pipes/decode.pipe';
import { CompileDirectiveModule } from '../shared/directives/compile.directive';

@NgModule({
  declarations: [
    NewsEditComponent,
    TextWindowComponent,
    DecodePipe,
  ],
  imports: [
    CommonModule,
    NewsEditRoutingModule,
    CKEditorModule,
    FormsModule,
    CompileDirectiveModule,
  ]
})
export class NewsEditModule { }

