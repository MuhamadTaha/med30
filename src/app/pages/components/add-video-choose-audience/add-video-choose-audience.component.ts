import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-video-choose-audience',
  templateUrl: './add-video-choose-audience.component.html',
  styleUrls: ['./add-video-choose-audience.component.scss'],

})
export class AddVideoChooseAudienceComponent {

  selectedFiles!: any;
  selectedDoctorsCount!: any;
  selectedFiles2!: any;

  hasChildren: any[] = []
  targetedValue: any[] = []

  files!: any[]

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    this.httpClient.get("assets/files.json").subscribe((res: any) => {
      console.log(res);
      this.files = res.data;
    })

  }

  onSelect(event: any) {
    this.hasChildren = []
    this.targetedValue = []
    this.selectedFiles.forEach((element: any) => {
      if (element.children) {
        this.hasChildren.push(element)
      } else {
        this.targetedValue.push(element)
      }
    });
    this.selectedDoctorsCount = this.targetedValue.length
    console.log('hasChildren', this.hasChildren)
    console.log('targetedValue', this.targetedValue)

  }

  onUnSelect(event: any) {
    this.hasChildren = []
    this.targetedValue = []
    this.selectedFiles.forEach((element: any) => {
      if (element.children) {
        this.hasChildren.push(element)
      } else {
        this.targetedValue.push(element)
      }
    });
    this.selectedDoctorsCount = this.targetedValue.length
    console.log('hasChildren', this.hasChildren)
    console.log('targetedValue', this.targetedValue)
  }

}
