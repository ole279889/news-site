import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import {Observable} from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class ChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor() { }

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
