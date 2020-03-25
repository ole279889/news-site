import { Component, Input, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-content-hide',
  templateUrl: './content-hide.component.html',
  styleUrls: ['./content-hide.component.scss']
})
export class ContentHideComponent implements OnInit, AfterContentInit {

  @Input() contentToHide: string;

  @ViewChild('hiddenContent') contentContainer: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.contentContainer.nativeElement.innerHTML = this.contentToHide;
    }, 0);
  }

}
