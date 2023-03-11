import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
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

  selectedFile!: any;
  selectedFileE!: any;

  constructor(private addVideoService: AddVideoService) { }

  closeDialog(currentFile: FileUpload) {
    currentFile.remove(this.selectedFileE, 0);
    this.closeDialogEvent.emit(false);
    this.showDialog = false
  }

  onFileSelect(event: any) {
    this.selectedFile = event.currentFiles[0];
    this.selectedFileE = event;
  }

  onFileRemove(event: any) {
    this.selectedFile = null;
  }

  uploadVideo(currentFile: FileUpload) {
    const file = this.selectedFile;
    var formData: any = new FormData();
    formData.append('file', file);
    // for (var pair of formData.entries()) {
    //   console.log(file);
    //   console.log(pair[0]);
    //   console.log(pair[1]);
    // }

    this.addVideoService.uploadFile(formData).subscribe((res: any) => {
      this.uploadVideoEvent.emit({ ...res, type: this.videoType, file: this.selectedFile });
      this.closeDialog(currentFile);
    });
  }

}
