import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  isLoading = false
  errorMessage: string = ''
  imagePath: any;

  currentTabIndex = 0;

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('rePassword')?.value
    return password === confirmPassword ? null : { passwordsNotMatching: true }
  }

  checkFile: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    return group.get('registrationNumber')?.value ? null : { fileIsRequired: true }
  }


  constructor(public authService: AuthService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'responsiblePerson': new FormGroup({
        'nameEn': new FormControl(''),
        'nameAr': new FormControl(''),
        'titleEn': new FormControl(''),
        'titleAr': new FormControl(''),
        'email': new FormControl('', Validators.email),
        'phone': new FormControl(''),
      }),
      'registrationNumber': new FormControl(''),
      'nameEn': new FormControl(''),
      'nameAr': new FormControl(''),
      'userName': new FormControl(''),
      'email': new FormControl('', Validators.email),
      'password': new FormControl(''),
      'rePassword': new FormControl(''),
      'phone': new FormControl(''),
    },
      { validators: [this.checkPasswords, this.checkFile] },
    )
  }

  signup(form: FormGroup) {
    this.isLoading = true
    this.signupForm.get('userName')?.setValue(this.signupForm.get('mail')?.value || '')
    console.log(form.value)

    this.authService.signUp(form.value).subscribe({
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

  onFileSelect(event: any) {
    const file = event.currentFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl('' + reader.result);
      this.signupForm.get('registrationNumber')?.setValue(this.imagePath.changingThisBreaksApplicationSecurity)
      // console.log('imagePath', this.imagePath)
      // console.log('imagePath nested', this.imagePath.changingThisBreaksApplicationSecurity)
      // console.log('imagePath nested 2', this.imagePath.changingThisBreaksApplicationSecurity.split('base64,')[1])
    };
  }

  onFileRemove(event: any) {
    console.log('onFileRemove', event)
    this.signupForm.get('registrationNumber')?.setValue(null)
  }

  // uploadFile(event: any) {

  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     console.log(reader.result);
  //     this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl('' + reader.result);
  //   };

  //   console.log('this.imagePath', this.imagePath);

  //   // this.authService.postFile(formData).subscribe({
  //   //   next: (response) => {
  //   //     this.isFileUploaded = true
  //   //     console.log('postFile response ===>', response)
  //   //   },
  //   //   error: (error) => {
  //   //     this.isFileUploaded = false
  //   //     console.log('postFile error ===>', error)
  //   //   },
  //   // });

  // }

  openSecondTab() {
    this.currentTabIndex = 1;
  }

  click() {
    console.log('signupForm', this.signupForm)
  }


}
