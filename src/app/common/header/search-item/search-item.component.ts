import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsItem } from '../../../shared/models/news';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @ViewChild('descriptionContainer') descriptionContainer: ElementRef;

  @Input() searchItem: NewsItem;
  @Input() set searchString(value: string) {
   const description = this.searchItem.shortDescription.replace(value, `<span style="color: red;">${value}</span>`);
   this.setDescription(description);
  }

  constructor() { }

  ngOnInit(): void {
  }

  setDescription(data) {
    setTimeout(() => this.descriptionContainer.nativeElement.innerHTML = data, 0);
  }

}
