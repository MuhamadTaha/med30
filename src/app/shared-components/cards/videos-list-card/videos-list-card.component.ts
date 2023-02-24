import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos-list-card',
  templateUrl: './videos-list-card.component.html',
  styleUrls: ['./videos-list-card.component.scss']
})
export class VideosListCardComponent implements OnInit {

  @Input() videosData: any;
  @Input() theme = '';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  openVideoDetails(id: any) {
    this.router.navigate([`videos/${id}`])
  }
}
