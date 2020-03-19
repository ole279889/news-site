import {Component, NgModule, OnInit} from '@angular/core';
import { IUser } from '../../shared/models/user';
import { AuthorizationService } from '../shared/authorization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../../shared/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private authorizationService: AuthorizationService,
    public loginDialog: MatDialogRef<LoginComponent>,
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  public closeDialog(): void {
    this.loginDialog.close();
  }

  public OnSubmit(value: IUser): void {
    this.authorizationService.logout();
    this.authorizationService.login(value);
    this.closeDialog();
  }

}

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, ReactiveFormsModule]
})
class LoginModule { }
