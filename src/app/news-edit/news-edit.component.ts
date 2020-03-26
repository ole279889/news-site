import { Component, OnInit } from '@angular/core';
import { MainPageService } from '../main-page/shared/main-page.service';
import { ActivatedRoute } from '@angular/router';
import { NewsItem } from '../shared/models/news';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../shared/guards/chandes.guard';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements ComponentCanDeactivate, OnInit {

  constructor(private mainPageService: MainPageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.mainPageService.selectedNewsItem);
    console.log(this.mainPageService.editableNewsItem);
    console.log('-----------------------------------');
  }

  get newsItem(): NewsItem {
    return this.mainPageService.selectedNewsItem;
  }

  get editableNewsItem(): NewsItem {
    return this.mainPageService.editableNewsItem;
  }

  set editableNewsItem(value: NewsItem) {
    this.mainPageService.editableNewsItem = value;
  }

  public canDeactivate(): boolean  | Observable<boolean> {
    return this.mainPageService.canDeactivate();
  }

  public save(): void {
    console.log(this.editableNewsItem);
  }

}
