import { Injectable } from '@angular/core';
import { NewsItem } from '../models/news';
import { MainPageService } from '../../main-page/shared/main-page.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public filteredNewsItems: NewsItem[] = [];

  constructor(private mainPageService: MainPageService) { }

  public searchByKeywords(keyword: string): void {
    keyword.length < 3 ? this.clearSearch() : this.applySearch(keyword);
  }

  private clearSearch(): void {
    this.filteredNewsItems = [];
  }

  private applySearch(keyword: string): void {
    this.filteredNewsItems = this.mainPageService.newsItems
      .filter((newsItem: NewsItem) => newsItem.shortDescription.indexOf(keyword) !== -1);
  }
}
