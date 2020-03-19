import {Component, Input, OnInit} from '@angular/core';
import {NewsItem} from '../shared/models/news';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() newsItem: NewsItem;

  constructor() { }

  ngOnInit(): void {
  }

}
