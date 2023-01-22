import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type';
import { NotificationTypes } from 'src/app/enum/notification-types';
import { Client } from 'src/app/models/client';
import { User } from 'src/app/models/user';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ShareDataOfApiService } from 'src/app/services/share-data-of-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  data: Client[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private serviceApi: ApiServiceService,
    private sharedDataApi: ShareDataOfApiService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token ?? '');
          this.authenticationService.addUserToLocalCache(
            response.body ?? new User()
          );
          if (response.status == HttpStatusCode.Ok) {
            this.afterRequestLoginSuccess();
          }
          this.router.navigateByUrl('/home');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(
            NotificationTypes.ERROR,
            errorResponse.error.message
          );
          this.showLoading = false;
        }
      )
    );
  }

  async afterRequestLoginSuccess(): Promise<void> {
    await this.serviceApi.apiAllClients.subscribe((res: Client[]) => {
      this.data = res;
      console.log(this.data);
      this.sharedDataApi.setClientData(this.data);
    });
  }

  private sendErrorNotification(
    notificationType: NotificationTypes,
    message: string
  ): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(
        notificationType,
        'An error occurred. Please try again.'
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
