import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainPageService } from '../main-page/shared/main-page.service';
import { Router } from '@angular/router';
import { NewsItem } from '../shared/models/news';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../shared/guards/chandes.guard';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements ComponentCanDeactivate, OnInit, OnDestroy {

  private isUpdate: boolean;
  private onUpdateItem: any;

  constructor(private mainPageService: MainPageService, private router: Router) { }

  ngOnInit(): void {
    this.isUpdate = Boolean(this.mainPageService.editableNewsItem.id);
    this.onUpdateItem = this.mainPageService.onNewsItemModifiedSubject.subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(['']);
      } else {
        console.log('error updatind records');
      }
    });
  }

  ngOnDestroy(): void {
    this.onUpdateItem.unsubscribe();
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
    if (!this.mainPageService.isNewsItemValid(this.editableNewsItem)) {
      return;
    }
    this.isUpdate
      ? this.mainPageService.updateNewsItem(this.editableNewsItem)
      : this.mainPageService.addNewsItem(this.editableNewsItem);
  }

}
