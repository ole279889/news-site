import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public toggleSubscription(event: MatCheckboxChange): void {
    event.checked
      ? this.notificationService.subscribeToNotifications()
      : this.notificationService.unsubscribe();
  }

}
