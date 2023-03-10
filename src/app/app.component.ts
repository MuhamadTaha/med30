import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.autoLogin()
  }

  ngOnDestroy(): void {
    // this.userSubscription.unsubscribe()
  }

}
