import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  currentText: string = 'About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text About Current Text ';
  editedText!: string;

  isEditMode = false;

  icons = {
    save: faCheckCircle,
    edit: faEdit,
    delete: faTimesCircle,
  }

  constructor() { }

  ngOnInit(): void {
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

}
