import { Component, OnInit } from '@angular/core';
import { MainPageService } from './shared/main-page.service';
import { NewsItem } from '../shared/models/news';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private mainPageService: MainPageService) {
    this.mainPageService.loadNews();
  }

  ngOnInit() {}

  get newsItems(): NewsItem[] {
    return this.mainPageService.newsItems;
  }

}
