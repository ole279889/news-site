import { Component, OnInit } from '@angular/core';
import { icons, iconsUrl } from './shared/iconlist';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './shared/services/notification.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MainPageService } from './main-page/shared/main-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'news-site';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private swPush: SwPush,
    private notificationService: NotificationService,
    private router: Router,
    private mainPageService: MainPageService,
  ) {
    this.swPush.notificationClicks.subscribe( event => {
      const url = event.notification.data.url;
      window.open(url, '_blank');
    });
  }

  ngOnInit() {
    this.generateIcons();
    this.notificationService.subscribeToNotifications();
    this.router.events
      .pipe( filter(event => event instanceof NavigationEnd) )
      .subscribe((event: RouterEvent) => {
        this.mainPageService.isMainPage = event.url === '/' ? true : false;
      });
  }

  private generateIcons(): void {
    icons.forEach((name: string) => {
      this.matIconRegistry.addSvgIcon(
        name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(iconsUrl + name + '.svg'),
      );
    });
  }
}
