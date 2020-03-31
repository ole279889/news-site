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

  public showError = false;

  private isUpdate: boolean;
  private onUpdateItem: any;

  constructor(
    private mainPageService: MainPageService,
    private router: Router
  ) {}

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

  get preview(): string {
    return this.mainPageService.editableNewsItem.preview;
  }

  set preview(value: string) {
    this.mainPageService.editableNewsItem.preview = value;
    this.mainPageService.saveEdit();
  }

  get shortDescription(): string {
    return this.mainPageService.editableNewsItem.shortDescription;
  }

  set shortDescription(value: string) {
    this.mainPageService.editableNewsItem.shortDescription = value;
    this.mainPageService.saveEdit();
  }

  get fullDescription(): string {
    return this.mainPageService.editableNewsItem.fullDescription;
  }

  set fullDescription(value: string) {
    this.mainPageService.editableNewsItem.fullDescription = value;
    this.mainPageService.saveEdit();
  }

  public canDeactivate(): boolean  | Observable<boolean> {
    return this.mainPageService.canDeactivate();
  }

  public onValidate(): void {
    if (this.mainPageService.isNewsItemValid() && this.showError) {
      this.showError = false;
    }
  }

  public save(): void {
    if (!this.mainPageService.isNewsItemValid()) {
      this.showError = true;
      return;
    }
    this.isUpdate
      ? this.mainPageService.updateNewsItem()
      : this.mainPageService.addNewsItem();
  }

}
