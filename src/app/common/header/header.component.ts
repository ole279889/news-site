import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../auth/shared/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
  }

  get isAuthorized(): boolean {
    return this.authorizationService.isAuthorized;
  }

  public openLoginDialog(): void {
    console.log('openLoginDialog');
  }

  public logout(): void {
    console.log('logout');
  }

}
