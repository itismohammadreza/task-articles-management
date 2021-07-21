import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from '@core/utils';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private router: Router) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error) {
          const errors = error.error.errors;
          for (const e in errors) {
            this.errorService.storeError({
              title: 'Error',
              message: `${e} ${errors[e]}`
            });
            if (error.status === 401) {
              localStorage.removeItem('token');
              setTimeout(() => {
                this.router.navigate(['/auth/login']);
              }, 2000);
            }
          }
          return throwError(error);
        }
      })
    );
  }
}
