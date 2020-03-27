import {ChangeDetectionStrategy, Component, Input, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-text-highlighting',
  templateUrl: './text-highlighting.component.html',
  styleUrls: ['./text-highlighting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextHighlightingComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [ TextHighlightingComponent ],
  imports: [ CommonModule ],
})
export class TextHighlightingModule { }
