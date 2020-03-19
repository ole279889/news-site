import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../auth/shared/authorization.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authorizationService: AuthorizationService,
    private dialogService: DialogService,
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

  public openLoginDialog(): void {
    this.dialogService.openLoginDialog();
  }

  public logout(): void {
    this.authorizationService.logout();
  }
}
