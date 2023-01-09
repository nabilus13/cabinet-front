import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationTypes } from '../enum/notification-types';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notifier: NotifierService) {}

  public notify(type: NotificationTypes, message: string) {
    this.notifier.notify(type, message);
  }
}
