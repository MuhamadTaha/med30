import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-video-dialog',
  templateUrl: './add-video-dialog.component.html',
  styleUrls: ['./add-video-dialog.component.scss']
})
export class AddVideoDialogComponent {

  constructor(private router: Router) { }

  @Input() showDialog: any = false;
  @Output() closeDialogEvent = new EventEmitter<any>();

  closeDialog() {
    this.showDialog = false
    this.closeDialogEvent.emit(false);
  }

  routeToAddVideo() {
    this.showDialog = false;
    this.router.navigate(['add-video'])
  }
}
