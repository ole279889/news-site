import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INewsItem, NewsItem } from '../../shared/models/news';
import { StorageService } from '../../shared/services/storage.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public isMainPage: boolean;
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
    this.saveEdit();
  }

  public saveEdit(): void {
    this.storage.set('editableNewsItem', this._editableNewsItem);
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

  public updateNewsItem(): void {
    const itemPatchParams: INewsItem = {
      preview: this.editableNewsItem.preview,
      shortDescription: this.editableNewsItem.shortDescription,
      fullDescription: this.editableNewsItem.fullDescription,
    }
    this.http.patch(`http://localhost:5000/news/${this.editableNewsItem.id}`, itemPatchParams).subscribe(() => {
      this.editableNewsItem = null;
      this.onNewsItemModifiedSubject.next(true);
    }, (error) => {
      console.log(error);
      this.onNewsItemModifiedSubject.next(false);
    });
  }

  public addNewsItem(): void {
    const itemAddParams: INewsItem = {
      preview: this.editableNewsItem.preview,
      shortDescription: this.editableNewsItem.shortDescription,
      fullDescription: this.editableNewsItem.fullDescription,
    }
    this.http.post(`http://localhost:5000/news`, itemAddParams).subscribe(() => {
      this.editableNewsItem = null;
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

  public isNewsItemValid(): boolean {
    return Boolean(this.editableNewsItem.preview)
      && Boolean(this.editableNewsItem.shortDescription)
      && Boolean(this.editableNewsItem.fullDescription);
  }

  private isEditableItemModified(): boolean {
    const hasSelected = Boolean(this.selectedNewsItem);
    const hasEditable = Boolean(this.editableNewsItem)
      && (Boolean(this.editableNewsItem.preview)
        || Boolean(this.editableNewsItem.shortDescription)
        || Boolean(this.editableNewsItem.fullDescription));
    return !hasSelected && hasEditable
      || (hasSelected && hasEditable && !this.isItemsEqual(this.selectedNewsItem, this.editableNewsItem));
  }

  private isItemsEqual(item1: NewsItem, item2: NewsItem): boolean {
    return item1.preview === item2.preview
      && item1.shortDescription === item2.shortDescription
      && item1.fullDescription === item2.fullDescription;
  }

}
