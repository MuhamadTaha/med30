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
    const tokenTest = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJuYW1lIiwianRpIjoiM2FmYTcxNGYtOTQwYy00NDhkLThjNWMtNGVhNzZkNTRlNTU0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJ0YWhhLXRlc3RAdGVzdC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuYW1lIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiLSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjMvMTMvMjAyMyA3OjQ3OjM3IFBNIiwiVXNlclR5cGUiOlsiMiIsIjIiXSwiVXNlclR5cGVFbnRpdHlJZCI6IjciLCJleHAiOjE2Nzg3NjIwNTcsImlzcyI6IjNPTUVEIiwiYXVkIjoiM09NRUQifQ.siiol_RTEeblN8rb_mYkph8l_ZqZXgjK_X6fh4S2X_w'


    if (token && token != undefined) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          ApiKey: `5fd79378-5012-4576-9e6a-392a0655d7db`,
        }
      });
    } else {
      request = request.clone({
        setHeaders: { ApiKey: `5fd79378-5012-4576-9e6a-392a0655d7db`, Authorization: tokenTest }
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

