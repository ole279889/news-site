import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { IUser } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  public currentUser: IUser;

  constructor(private storageService: StorageService) {
    this.currentUser = this.storageService.get('user');
  }

  get isAuthorized(): boolean {
    return Boolean(this.currentUser);
  }

  public login(user: IUser): void {
    this.storageService.set('user', user);
    this.currentUser = user;
  }

  public logout(): void {
    this.storageService.remove('user');
    this.currentUser = undefined;
  }
}
