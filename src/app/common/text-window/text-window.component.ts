import { Component, OnInit, Input } from '@angular/core';

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
