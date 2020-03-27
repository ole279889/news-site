import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  readonly VAPID_PUBLIC = 'BDqsXGOcgoovaVzcTJfecn-QkMg0nt4y4MfYEZG6S4Wo_erPGrNMt19X_N_1ZfAdgTMrN-XeOYySNxFBTM1sNUM';

  private pushSubscription: PushSubscription;

  constructor(private swPush: SwPush, private http: HttpClient) {}

  public subscribeToNotification(): void {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC
    })
      .then((sub: PushSubscription) => {
        console.log(sub);
        this.pushSubscription = sub;
        this.sendToServer(sub);
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  public sendNotification(): void {
    if (this.pushSubscription) {
      this.sendToServer(this.pushSubscription);
    } else {
      this.subscribeToNotification();
    }
  }

  private sendToServer(params: PushSubscription): void {
    this.http.post('http://localhost:5000/notifications', { notification : params }).subscribe();
  }

}
