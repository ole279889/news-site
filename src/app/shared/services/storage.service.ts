import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private STORAGE_PREFIX = 'news-pwa-';

  constructor() { }

  public get(key: string): any {
    return JSON.parse(localStorage.getItem(this.STORAGE_PREFIX + key));
  }

  public set(key: string, value: any): void {
    localStorage.setItem(this.STORAGE_PREFIX + key, JSON.stringify(value));
  }

  public remove(key: string) {
    localStorage.removeItem(this.STORAGE_PREFIX + key);
  }

  public clearAll() {
    localStorage.clear();
  }
}
