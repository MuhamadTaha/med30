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
  errorMessage: string = ''
  isFileUploaded = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null),
    })
  }

  signup(form: FormGroup) {
    this.isLoading = true

    this.authService.signUp(form.value.email, form.value.password).subscribe({
      next: (res) => {
        console.log('res ====> ', res)
        this.isLoading = false
      },
      error: (err) => {
        console.log('error ====> ', err)
        this.errorMessage = err
        this.isLoading = false
      },
    })
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    var formData: any = new FormData();
    formData.append('file', file);

    this.authService.postFile(formData).subscribe({
      next: (response) => {
        this.isFileUploaded = true
        console.log('postFile response ===>', response)
      },
      error: (error) => {
        this.isFileUploaded = false
        console.log('postFile error ===>', error)
      },
    });

  }

}
