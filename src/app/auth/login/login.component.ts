import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  isLoading = false

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null),
    })
  }


  login(form: FormGroup) {
    this.isLoading = true
    let x = form.value;
    x.returnSecureToken = true

    this.authService.logIn(x).subscribe(
      res => {
        console.log('res ====> ', res)
        this.isLoading = false
      },
      // error => {
      //   console.log('error ====> ', error)
      //   this.isLoading = false
      // },
    )
  }

}
