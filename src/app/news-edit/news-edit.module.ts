import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsEditComponent } from './news-edit.component';
import { NewsEditRoutingModule } from './news-edit-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { TextWindowModule } from '../common/text-window/text-window.component';
import { CompileDirectiveModule } from '../shared/directives/compile.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    NewsEditComponent,
  ],
  imports: [
    CommonModule,
    NewsEditRoutingModule,
    CKEditorModule,
    FormsModule,
    CompileDirectiveModule,
    TextWindowModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class NewsEditModule { }

