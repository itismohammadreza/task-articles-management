import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated()) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: 'Token ' + localStorage.getItem('token')
        }
      });
      return next.handle(clonedRequest);
    }
    else {
      return next.handle(request);
    }
  }
}
