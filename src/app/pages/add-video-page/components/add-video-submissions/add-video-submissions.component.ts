import { Component } from '@angular/core';

@Component({
  selector: 'app-add-video-submissions',
  templateUrl: './add-video-submissions.component.html',
  styleUrls: ['./add-video-submissions.component.scss']
})
export class AddVideoSubmissionsComponent {


  constructor() { }

  submitRequest() {
    console.log('submitRequest')
  }

  continueLater() {
    console.log('continueLater')
  }

  cancelRequest() {
    console.log('cancelRequest')
  }


}
