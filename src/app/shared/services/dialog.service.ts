import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private matDialog: MatDialog,
  ) { }

  async openLoginDialog() {
    const {LoginComponent} = await import('../../auth/login/login.component');
    this.matDialog.open(LoginComponent, {});
  }

}
