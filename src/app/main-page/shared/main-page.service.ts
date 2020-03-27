import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INewsItem, NewsItem } from '../../shared/models/news';
import { StorageService } from '../../shared/services/storage.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public newsItems: NewsItem[] = [];
  public selectedNewsItem: NewsItem;
  public onNewsItemModifiedSubject: Subject<boolean> = new Subject<boolean>();
  private _editableNewsItem: NewsItem;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.editableNewsItem = this.storage.get('editableNewsItem');
  }

  get editableNewsItem(): NewsItem {
    return this._editableNewsItem;
  }

  set editableNewsItem(value: NewsItem) {
    this._editableNewsItem = value;
    this.storage.set('editableNewsItem', value);
  }

  public loadNews(): void {
    this.http.get('http://localhost:5000/news').subscribe((newsItems: NewsItem[]) => {
      setTimeout(() => {
        this.newsItems = newsItems;
      }, 2000);
    });
  }

  public loadNewsItem(id: number): void {
    this.http.get(`http://localhost:5000/news/${id}`).subscribe((newsItem: NewsItem) => {
      this.selectedNewsItem = newsItem;
    });
  }

  public updateNewsItem(item: NewsItem): void {
    const itemPatchParams: INewsItem = {
      preview: item.preview,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
    }
    this.http.patch(`http://localhost:5000/news/${item.id}`, itemPatchParams).subscribe(() => {
      this.onNewsItemModifiedSubject.next(true);
    }, (error) => {
      console.log(error);
      this.onNewsItemModifiedSubject.next(false);
    });
  }

  public addNewsItem(item: NewsItem): void {
    const itemAddParams: INewsItem = {
      preview: item.preview,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
    }
    this.http.post(`http://localhost:5000/news`, itemAddParams).subscribe(() => {
      this.onNewsItemModifiedSubject.next(true);
    }, (error) => {
      console.log(error);
      this.onNewsItemModifiedSubject.next(false);
    });
  }

  public canDeactivate(): boolean  | Observable<boolean> {
    if (this.isEditableItemModified()) {
      return confirm('Вы действительно хотите покинуть страницу? Несохраненные данные будут утеряны.');
    } else {
      return true;
    }
  }

  public isNewsItemValid(item: NewsItem): boolean {
    return Boolean(item.preview)  && Boolean(item.shortDescription) && Boolean(item.fullDescription);
  }

  private isEditableItemModified(): boolean {
    return (this.selectedNewsItem && this.editableNewsItem)
      && !(this.selectedNewsItem.preview === this.editableNewsItem.preview
        && this.selectedNewsItem.shortDescription === this.editableNewsItem.shortDescription
        && this.selectedNewsItem.fullDescription === this.editableNewsItem.fullDescription);
  }

}
