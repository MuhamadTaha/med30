import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddVideoService } from '../../services/add-video.service';

@Component({
  selector: 'app-upload-video-dialog',
  templateUrl: './upload-video-dialog.component.html',
  styleUrls: ['./upload-video-dialog.component.scss']
})
export class UploadVideoDialogComponent {

  @Input() showDialog: any = false;
  @Input() videoType!: string;
  @Output() closeDialogEvent = new EventEmitter<any>();
  @Output() uploadVideoEvent = new EventEmitter<any>();

  // isFileUploaded = false;
  test = 'test';
  selectedFile!: any;

  constructor(private addVideoService: AddVideoService) { }

  closeDialog() {
    this.showDialog = false
    this.closeDialogEvent.emit(false);
  }

  onFileSelect(event: any) {
    this.selectedFile = event.currentFiles[0];
  }

  onFileRemove(event: any) {
    this.selectedFile = null;
  }

  uploadVideo() {
    const file = this.selectedFile;
    var formData: any = new FormData();
    formData.append('file', file);
    for (var pair of formData.entries()) {
      console.log(file);
      console.log(pair[0]);
      console.log(pair[1]);
    }

    this.addVideoService.uploadFile(formData).subscribe({
      next: (response) => {
        // this.isFileUploaded = true
        this.uploadVideoEvent.emit({ res: response, videoType: this.videoType });
        console.log('uploadFile response ===>', response)
      },
      error: (error) => {
        // this.isFileUploaded = false
        console.log('uploadFile error ===>', error)
      },
    });

  }

}
