import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  isLoading = false
  errorMessage: string = ''

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null),
    })
  }


  login(form: FormGroup) {
    this.isLoading = true

    this.authService.logIn(form.value.email, form.value.password).subscribe({
      next: (res) => {
        console.log('res ====> ', res)
        this.isLoading = false
        this.router.navigate([''])
      },
      error: (err) => {
        console.log('error ====> ', err)
        this.errorMessage = err
        this.isLoading = false;
      },
    })
  }

}
