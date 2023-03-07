import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();


    if (token && token != undefined) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          ApiKey: `5fd79378-5012-4576-9e6a-392a0655d7db`,
        }
      });
    } else {
      request = request.clone({
        setHeaders: { ApiKey: `5fd79378-5012-4576-9e6a-392a0655d7db`, }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 400) {
            // this.authService.logout()
          }
        }
        return throwError(err);
      })
    )
  }
}

