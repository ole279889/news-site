import { Component, OnInit } from '@angular/core';
import { MainPageService } from '../main-page/shared/main-page.service';
import { NewsItem } from '../shared/models/news';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  constructor(private mainPageService: MainPageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const itemID = Number(this.route.snapshot.paramMap.get('id'));
    this.mainPageService.loadNewsItem(itemID);
  }

  get newsItem(): NewsItem {
    return this.mainPageService.selectedNewsItem;
  }

}
