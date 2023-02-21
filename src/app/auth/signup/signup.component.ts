import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  isLoading = false
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null),
    })
  }

  signup(form: FormGroup) {
    this.isLoading = true

    let x = form.value;
    x.returnSecureToken = true
    console.log('x ====> ', x)

    this.authService.signUp(x).subscribe(
      res => {
        console.log('res ====> ', res)
        this.isLoading = false
      },
      error => {
        console.log('error ====> ', error)
        this.isLoading = false
      },
    )
  }


}
