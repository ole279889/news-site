import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompileDirectiveModule } from '../../shared/directives/compile.directive';
import { DecodePipe } from '../../shared/pipes/decode.pipe';

@Component({
  selector: 'app-text-window',
  templateUrl: './text-window.component.html',
  styleUrls: ['./text-window.component.scss']
})
export class TextWindowComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

  get textDescription(): string {
    return this.text;
  }

}

@NgModule({
  declarations: [TextWindowComponent, DecodePipe],
  imports: [CommonModule, CompileDirectiveModule],
  exports: [TextWindowComponent]
})
export class TextWindowModule { }
