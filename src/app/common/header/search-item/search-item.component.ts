import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../../../shared/models/news';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  public search = '';
  public description = '';

  @Input() searchItem: NewsItem;
  @Input() set searchString(value: string) {
   this.search = value;
   this.description = this.searchItem.shortDescription
     .replace(value, `<app-text-highlighting [text]="'${value}'"></app-text-highlighting>`);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
