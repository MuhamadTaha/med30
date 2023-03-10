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
    // for (var pair of formData.entries()) {
    //   console.log(file);
    //   console.log(pair[0]);
    //   console.log(pair[1]);
    // }

    this.addVideoService.uploadFile(formData).subscribe((res: any) => {
      this.uploadVideoEvent.emit({ res: res, videoType: this.videoType, selectedFile: this.selectedFile });
      console.log('uploadFile response ===>', res)
      this.closeDialog();
    });

  }

}
