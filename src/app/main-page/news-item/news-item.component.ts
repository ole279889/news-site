import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../../shared/models/news';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() newsItem: NewsItem;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public getDetails(): void {
    this.router.navigate(['news-detail', this.newsItem.id]);
  }

}
