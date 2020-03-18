import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public isAuthorized = true;

  constructor() { }
}
