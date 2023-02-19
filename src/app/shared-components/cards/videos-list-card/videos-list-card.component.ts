import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos-list-card',
  templateUrl: './videos-list-card.component.html',
  styleUrls: ['./videos-list-card.component.scss']
})
export class VideosListCardComponent implements OnInit {

  @Input() videosData: any;

  constructor() { }

  ngOnInit(): void {
    this.videosData = {
      image: '../../../../assets/images/medicines.jpg',
      name: 'Video name',
      status: 'Published',
      views: '3'
    }
  }

}
