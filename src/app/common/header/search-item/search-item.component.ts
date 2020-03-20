import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../../../shared/models/news';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @Input() searchItem: NewsItem;

  constructor() { }

  ngOnInit(): void {
  }

}
