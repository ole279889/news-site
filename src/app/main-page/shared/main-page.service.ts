import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsItem } from '../../shared/models/news';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public newsItems: NewsItem[] = [];

  constructor(private http: HttpClient) { }

  public loadNews(): void {
    this.http.get('http://localhost:3000/news').subscribe((newsItems: NewsItem[]) => {
      this.newsItems = newsItems;
    });
  }
}
