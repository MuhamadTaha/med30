import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


  profileDetailsForm!: FormGroup
  isLoading = false
  imagePath: any;

  isEditMode = false;

  icons = {
    save: faCheckCircle,
    edit: faEdit,
    delete: faTimesCircle,
  }

  constructor(private authService: AuthService, private domSanitizer: DomSanitizer) { }

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

}
