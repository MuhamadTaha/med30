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

    const privateData = {
      "type": "service_account",
      "project_id": "med30-med30",
      "private_key_id": "4471e710c9e4ef3a1e1c6ca9c580c43c1f038aba",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDFslckXg9hqyIw\nJv3rpxXH4E1i0ay8LKHbX/bsdIkS/Js7/gxFM+DQxfhpFRX9lndi6ZUsrknE93fp\nlS+eo9AJFLucz8oFJVhEJAyKEp1ho38nAoMtZqt7Zug0SaAntiB26s6EmkdNeV/j\nWzcjsxLA1PWw491aiVwLpRdJPvEIcenVi/kqjPmH2/BVXEN6A3iLEaxy5X82HvU1\n+Xw1hhSh2oXPOD+okYZFD3lf/E0e40lV42wxV1v0HsipSfilop3eS7M28LKMQyLV\n4FMQQ3FWhNAqJ+e/EetjWugUzL+4h6RD/VKnCYr8fWZRGcmeomkkt3BPS2rlfg97\n3YlrLJVxAgMBAAECggEABT3RB8W+5Ydzk8hf3nLmzd6jfJuLp25NQQdIgRzGmthT\nzw2RcpcBVpWuHC6e/3MBIbAo2Gc7TVekkC7IdT25fPklz362l+f1YPKd+r3rOmjK\n3OxZER/GC4K3JLZAQtdGQXLgpHVA71PYzArJwaZ8eHx48l57OpyWUjh3f2WV30P2\nYRHp1A9xwl8sBl4Z09QGS/AGWL9xyF1mGs8IlH5P6TNOmCXg9lLyiaXiIMqROzYm\nofXVKY9u6/YIq/yhD1UMkmVMnn1tHmbS9+TxTrTBTrivXY/hxITWDhqxJWuVTiVX\nKfb7Ici1ee0OQeR1QdfCazYlSAUa0GANXBTA7QIngQKBgQD/gkWMJVA5V8pSxbNP\nCNtwqcCuDhdFZxkpIBNNtR+Fp9scTTZ7Ue7D1xygd29G2q7g2E3YOZ89+y7zd1l+\nJnaWTa+7gj64KUrz3qQfdPms40+BxTzAaXW6PH8g+n/GI6ihqv8vQfH0dJkTIMoW\ndCrVfsPY0xEIiTLF4f2BZoho8QKBgQDGE5785RQdCzMfDTvFWhyC3y3B+YqMrLag\n8242v4xyQ2Ila0jnPFKTV7Qr+BybMCOGUXtMQDFf6QNVtljkzZeddN/ZWXiagerz\nrZwHwM/dqnMusx2onXvqSyFkdx07xh00Eyy8hth5CQGIx4tbWRhxrt/EbyjsEH4e\nmzZI0wr0gQKBgCVhdbNPMjFxepQpgFYrwY72Bs5wGU96CeBOZQSVXws6x3+YfEQG\ndJwKOJHxZ0JCdBtJCfp8U6PJv9C2wU0Ha4oJy4/vOiXPRLvw8qn3fx+gEd22cXDk\n/OhGOYMlotPmG6GrVrIfP7q35D08KtSmIi4h4Z0zI+bPy7HPojrwOTzBAoGAe2f4\nEvmqKVoz9HGrPo6g2syvVn3hWzmz4t0nWobGut3OhR+tYRvNGq12vDotoGZCi8my\nNtR7rpSfFkSwZ4TLpDcPy/uZTzIILt+IKbBwEVvDvWGs5cOQU22RlWU82mPZB/u2\nUJL2xZnd0dj4suX0e8eG9HyJE2JHIUx0arTJy4ECgYA7f+1DhT4+0msQ/vbffBj7\nFKqNvmdZr1jVqnxm8N/kGURi3LowLOvXxh/mmIgfynkKSzUmyGQHZzTPR16MGyJ9\nh9lpcANazi2DWbF4PXXjcWzsxAvUCO5V1ZmWiuO7vJp1lTKDlKcamGfkaAO3zFgq\nDZV9k2lw+KneJzuqxGiSaQ==\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-i8906@med30-med30.iam.gserviceaccount.com",
      "client_id": "109603544878495961897",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i8906%40med30-med30.iam.gserviceaccount.com"
    }

    if (token) {
      request = request.clone({
        // setHeaders: { Authorization: `Bearer ${token}` }
        setHeaders: { Authorization: `keys=${privateData.private_key_id}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 400) {
            this.authService.logout()
          }
        }
        return throwError(err);
      })
    )
  }
}

