import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ValidatorsService } from 'src/app/services/validators.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  isLoading = false
  imagePath: any;

  currentTabIndex = 0;

  constructor(
    public authService: AuthService,
    private messageService: MessageService,
    private validatorsService: ValidatorsService,
    private domSanitizer: DomSanitizer,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'phone': new FormControl('phone'),
      'password': new FormControl('Test@123'),
      'rePassword': new FormControl('Test@123'),
      'name': new FormControl('name'),
      'email': new FormControl('-'),
      'companyName': new FormControl('companyName'),
      'companyEmail': new FormControl('company@Email', Validators.email),
      'comercialRegistrationNumber': new FormControl(''),
      'title': new FormControl('title'),
    },
      { validators: [this.validatorsService.checkPasswordsMatching, this.validatorsService.checkFile, this.validatorsService.checkPasswordValid] },
    )
  }

  signup(form: FormGroup) {
    this.isLoading = true
    const mapFormValueFrom = (obj: any, prop: any) => {
      let { [prop]: omit, ...res } = obj
      return res
    }

    let formValue = mapFormValueFrom(form.value, 'rePassword');

    console.log('form ===> ', form)
    console.log('formValue ===> ', formValue)

    this.authService.signUp(formValue).subscribe({
      next: (res: any) => {
        if (res.isSucess) {
          console.log('res ====> ', res)
          this.isLoading = false
          this.showToaster('success', 'Success', 'You have been registered successfully');
          this.router.navigate(['auth/login'])
        } else {
          console.log('res ====> ', res)
          this.isLoading = false
          this.showToaster('error', res.errorCode, res.error);
        }
      },
      error: (err) => {
        console.log('error ====> ', err)
        this.showToaster('error', err, err);
        this.isLoading = false
      },
    })
  }

  onFileSelect(event: any) {
    const file = event.currentFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl('' + reader.result);
      this.signupForm.get('comercialRegistrationNumber')?.setValue(this.imagePath.changingThisBreaksApplicationSecurity.split('base64,')[1])
      // console.log('imagePath', this.imagePath)
      // console.log('imagePath nested', this.imagePath.changingThisBreaksApplicationSecurity)
      // console.log('imagePath nested 2', this.imagePath.changingThisBreaksApplicationSecurity.split('base64,')[1])
    };
  }

  onFileRemove(event: any) {
    console.log('onFileRemove', event)
    this.signupForm.get('comercialRegistrationNumber')?.setValue(null)
  }

  openSecondTab() {
    this.currentTabIndex = 1;
  }

  click() {
    console.log('signupForm', this.signupForm);
  }

  showToaster(severity: string, title: string, errorMessage: string) {
    this.messageService.add({ severity: severity, summary: title, detail: errorMessage });
  }


}
