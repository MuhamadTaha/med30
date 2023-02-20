import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  coverageTitle = 'Coverage rate'
  interfactionalTitle = 'Interfactional view'
  coverageChartData = {
    labels: ['Covered', 'NotCovered'],
    datasets: [
      {
        data: [4, 2],
        backgroundColor: ["#3ba500", "#0870e7"]
      }
    ]
  };
  interfactionalChartData = {
    labels: ['No. of interfactional views', 'No. of non-interfactional views'],
    datasets: [
      {
        data: [2, 2],
        backgroundColor: ["#3ba500", "#0870e7"]
      }
    ]
  };

  doctorsData = {
    image: '../../../../assets/images/doctor-avatar.png',
    name: 'Doctor name',
    title: 'Title'
  }

  videosData = {
    image: '../../../../assets/images/medicines.jpg',
    name: 'Video name',
    status: 'Published',
    views: '3'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
