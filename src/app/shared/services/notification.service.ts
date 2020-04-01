import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public isEnabled = this.swPush.isEnabled;
  public isGranted = Notification.permission === 'granted';

  readonly VAPID_PUBLIC = 'BDqsXGOcgoovaVzcTJfecn-QkMg0nt4y4MfYEZG6S4Wo_erPGrNMt19X_N_1ZfAdgTMrN-XeOYySNxFBTM1sNUM';

  private pushSubscription: PushSubscription;

  constructor(private swPush: SwPush, private http: HttpClient) {}

  public subscribeToNotifications(): void {
    if (!(this.isEnabled && this.isGranted) || this.pushSubscription) {
      return;
    }
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC
    })
      .then((sub: PushSubscription) => {
        this.pushSubscription = sub;
        this.sendToServer(this.pushSubscription);
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  public unsubscribe(): void {
    this.pushSubscription = null;
    this.swPush.unsubscribe();
  }

  private sendToServer(params: PushSubscription): void {
    this.http.post('http://localhost:5000/notifications', { notification : params }).subscribe();
  }

}
