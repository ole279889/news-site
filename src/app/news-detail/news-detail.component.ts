import { Component, OnInit } from '@angular/core';
import { MainPageService } from '../main-page/shared/main-page.service';
import { NewsItem } from '../shared/models/news';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../auth/shared/authorization.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  constructor(
    private mainPageService: MainPageService,
    private route: ActivatedRoute,
    private router: Router,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    const itemID = Number(this.route.snapshot.paramMap.get('id'));
    this.mainPageService.loadNewsItem(itemID);
  }

  get newsItem(): NewsItem {
    return this.mainPageService.selectedNewsItem;
  }

  get isAuthorized(): boolean {
    return this.authorizationService.isAuthorized;
  }

  public editNewsItem(item: NewsItem): void {
    this.mainPageService.editableNewsItem = new NewsItem(item);
    this.router.navigate(['news-edit', item.id]);
  }

}
