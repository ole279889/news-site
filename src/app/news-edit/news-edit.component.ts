import { Component, OnInit } from '@angular/core';
import { MainPageService } from '../main-page/shared/main-page.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit {

  constructor(private mainPageService: MainPageService) { }

  ngOnInit(): void {
  }

}
