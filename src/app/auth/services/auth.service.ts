import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCREljbBydsZWeJBBE254HYjvRMg2DcdMo',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe(catchError(this.handleError), tap(resData => {
        localStorage.setItem('token', resData.idToken)
      }))
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCREljbBydsZWeJBBE254HYjvRMg2DcdMo',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe(catchError(this.handleError), tap(resData => {
        this.router.navigate(['/auth/login'])
      }))
  }

  getAuthToken(): string {
    return localStorage.getItem('token') || ''
  }

  autoLogin() {
    if (!localStorage.getItem('token')) {
      this.logout()
    } else {
      this.router.navigate([''])
    }
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token') || '';
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return Date.now() > expiry * 1000;
  }

  postFile(formData: FormData) {
    return this.http.post('http://localhost:4000/api/create-user', formData)
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "an unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
    }
    return throwError(errorMessage)
  }

}
