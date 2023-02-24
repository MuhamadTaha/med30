import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


  signupForm!: FormGroup
  isLoading = false
  errorMessage: string = ''
  isFileUploaded = false;

  currentText: string = '123123132132132165464646541354';
  editedText!: string;

  isEditMode = false;

  icons = {
    save: faCheckCircle,
    edit: faEdit,
    delete: faTimesCircle,
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null),
    })
    this.editedText = this.currentText
  }

  edit() {
    this.isEditMode = true;
    this.editedText = this.editedText;
  }

  save() {
    this.currentText = this.editedText;
    this.isEditMode = false;
  }

  cancel() {
    this.editedText = this.currentText;
    this.isEditMode = false;
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
