import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authenticationService.host}/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (
      httpRequest.url.includes(`${this.authenticationService.host}/register`)
    ) {
      return httpHandler.handle(httpRequest);
    }
    if (
      httpRequest.url.includes(
        `${this.authenticationService.host}/user/resetPassword`
      )
    ) {
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return httpHandler.handle(request);
  }
}
