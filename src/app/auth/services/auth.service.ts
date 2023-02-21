import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logIn(request: any) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCREljbBydsZWeJBBE254HYjvRMg2DcdMo', request)
  }

  signUp(request: any) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCREljbBydsZWeJBBE254HYjvRMg2DcdMo', request)
  }

}
