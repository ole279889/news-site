import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from '../../auth/shared/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authorizationService: AuthorizationService) { }

  canActivate() {
    if (this.authorizationService.isAuthorized) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
