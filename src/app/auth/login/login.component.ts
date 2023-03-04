import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  isLoading = false

  constructor(public authService: AuthService, private messageService: MessageService, public router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl(''),
    })
  }


  login(form: FormGroup) {
    this.isLoading = true

    this.authService.logIn(form.value).subscribe({
      next: (res) => {
        console.log('res ====> ', res)
        this.isLoading = false
        this.router.navigate([''])
      },
      error: (err) => {
        console.log('error ====> ', err)
        this.showErrorToast(err);
        this.isLoading = false;
      },
    })
  }

  showErrorToast(errorMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
  }

}
