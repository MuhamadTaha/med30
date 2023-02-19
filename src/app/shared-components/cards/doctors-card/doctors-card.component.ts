import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctors-card',
  templateUrl: './doctors-card.component.html',
  styleUrls: ['./doctors-card.component.scss']
})
export class DoctorsCardComponent implements OnInit {

  @Input() doctorsData: any;

  constructor() { }

  ngOnInit(): void {

    this.doctorsData = {
      image: '../../../../assets/images/doctor-avatar.png',
      name: 'Doctor name',
      title: 'Title'
    }

  }

}
