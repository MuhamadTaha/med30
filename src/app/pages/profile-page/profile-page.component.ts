import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


  profileDetailsForm!: FormGroup
  changePasswordForm!: FormGroup
  isLoading = false
  imagePath: any;

  isEditMode = false;
  displayChangePasswordDialog = false;

  icons = {
    save: faCheckCircle,
    edit: faEdit,
    delete: faTimesCircle,
  }

  constructor(private validatorsService: ValidatorsService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.profileDetailsForm = new FormGroup({
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
    })

    this.changePasswordForm = new FormGroup({
      'currentPassword': new FormControl(''),
      'password': new FormControl(''),
      'rePassword': new FormControl(''),
    },
      { validators: [this.validatorsService.checkPasswordsMatching, this.validatorsService.checkPasswordValid] },)
  }

  edit() {
    this.isEditMode = true;
  }

  save() {
    this.isEditMode = false;
  }

  cancel() {
    this.isEditMode = false;
  }

  onFileSelect(event: any) {
    const file = event.currentFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl('' + reader.result);
      this.profileDetailsForm.get('registrationNumber')?.setValue(this.imagePath.changingThisBreaksApplicationSecurity)
    };
  }

  openChangePasswordDialog() {
    this.displayChangePasswordDialog = true
    console.log('openChangePasswordDialog')
  }

  closeDialog() {
    this.displayChangePasswordDialog = false
    console.log('closeDialog')
  }

  changePassword(form: any) {
    console.log('changePassword', form)
    this.displayChangePasswordDialog = false

  }

}
