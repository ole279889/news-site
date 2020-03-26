import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsItem } from '../../shared/models/news';
import { StorageService } from '../../shared/services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public newsItems: NewsItem[] = [];
  public selectedNewsItem: NewsItem;
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
    this.http.get('http://localhost:3000/news').subscribe((newsItems: NewsItem[]) => {
      setTimeout(() => {
        this.newsItems = newsItems;
      }, 2000);
    });
  }

  public loadNewsItem(id: number): void {
    this.http.get(`http://localhost:3000/news/${id}`).subscribe((newsItem: NewsItem) => {
      this.selectedNewsItem = newsItem;
    });
  }

  public canDeactivate(): boolean  | Observable<boolean> {
    if (this.isEditableItemModified()) {
      return confirm('Вы действительно хотите покинуть страницу? Несохраненные данные будут утеряны.');
    } else {
      return true;
    }
  }

  private isEditableItemModified(): boolean {
    return !(this.selectedNewsItem.preview === this.editableNewsItem.preview
      && this.selectedNewsItem.shortDescription === this.editableNewsItem.shortDescription
      && this.selectedNewsItem.fullDescription === this.editableNewsItem.fullDescription);
  }

}
