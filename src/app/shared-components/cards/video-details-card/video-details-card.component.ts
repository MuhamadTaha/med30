import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp, faEye, faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-video-details-card',
  templateUrl: './video-details-card.component.html',
  styleUrls: ['./video-details-card.component.scss']
})
export class VideoDetailsCardComponent implements OnInit {

  @Input() videosDetails!: any;
  @Input() theme = '';

  icons = {
    like: faThumbsUp,
    user: faUser,
    view: faEye,
    edit: faEdit,
    delete: faTimesCircle,
  }

  iconsData = [
    { title: 'Target doctors', icon: this.icons.user, number: '3' },
    { title: 'views', icon: this.icons.view, number: '2' },
    { title: 'likes', icon: this.icons.like, number: '3' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
