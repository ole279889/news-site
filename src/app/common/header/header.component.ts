import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import { AuthorizationService } from '../../auth/shared/authorization.service';
import { DialogService } from '../../shared/services/dialog.service';
import { FilterService } from '../../shared/services/filter.service';
import { INewsItem, NewsItem } from '../../shared/models/news';
import { Router } from '@angular/router';
import { MainPageService } from '../../main-page/shared/main-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public filter = '';

  @HostListener('document:click', ['$event']) clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.clearSearch();
    }
  }

  constructor(
    private authorizationService: AuthorizationService,
    private dialogService: DialogService,
    private filterService: FilterService,
    private router: Router,
    private mainPageService: MainPageService,
    private eRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  get isAuthorized(): boolean {
    return this.authorizationService.isAuthorized;
  }

  get currentUserLogin(): string {
    return this.authorizationService.currentUser
      ? this.authorizationService.currentUser.login
      : undefined;
  }

  get searchResults(): NewsItem[] {
    return this.filterService.filteredNewsItems;
  }

  public openLoginDialog(): void {
    this.dialogService.openLoginDialog();
  }

  public logout(): void {
    this.authorizationService.logout();
  }

  public onSearch(value: string): void {
    this.filterService.searchByKeywords(value);
  }

  public getDetails(id: number): void {
    this.clearSearch();
    this.router.navigate(['news-detail', id]);
  }

  public addNewsItem(): void {
    const item: INewsItem = {
      id: 0,
      preview: '',
      shortDescription: '',
      fullDescription: '',
    };
    this.mainPageService.editableNewsItem = new NewsItem(item);
    this.router.navigate(['news-add']);
  }

  public isMainPage(): boolean {
    return this.mainPageService.isMainPage;
  }

  public toMainPage(): void {
    this.router.navigate(['']);
  }

  clearSearch(): void {
    this.filter = '';
    this.filterService.clearSearch();
  }

}
