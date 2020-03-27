import { Component, OnInit } from '@angular/core';
import { icons, iconsUrl } from './shared/iconlist';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwPush } from '@angular/service-worker';

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
  ) {
    this.swPush.notificationClicks.subscribe( event => {
      const url = event.notification.data.url;
      window.open(url, '_blank');
    });
  }

  ngOnInit() {
    this.generateIcons();
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
