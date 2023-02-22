import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  charts: any;
  doctors: any;
  videos: any;

  constructor(public generalService: GeneralService) { }

  ngOnInit(): void {
    this.getChartsData()
    this.getDoctorsData()
    this.getVideosData()
  }

  getChartsData() {
    this.generalService.getCharts().pipe(
      map((chartsBE: { [key: string]: any }) => {
        const chartsArr = []
        for (const key in chartsBE) {
          if (chartsBE.hasOwnProperty(key)) {
            chartsArr.push({ ...chartsBE[key], id: key })
          }
        }
        return chartsArr
      })
    ).subscribe((charts: any) => {
      this.charts = charts
      console.log(this.charts)
    })
  }

  getDoctorsData() {
    this.generalService.getDoctors().pipe(
      map((doctorsBE: { [key: string]: any }) => {
        const doctorsArr = []
        for (const key in doctorsBE) {
          if (doctorsBE.hasOwnProperty(key)) {
            doctorsArr.push({ ...doctorsBE[key], id: key })
          }
        }
        return doctorsArr
      })
    ).subscribe((doctors: any) => {
      this.doctors = doctors
      console.log(this.doctors)
    })
  }

  getVideosData() {
    this.generalService.getVideos().pipe(
      map((videosBE: { [key: string]: any }) => {
        const videosArr = []
        for (const key in videosBE) {
          if (videosBE.hasOwnProperty(key)) {
            videosArr.push({ ...videosBE[key], id: key })
          }
        }
        return videosArr
      })
    ).subscribe((videos: any) => {
      this.videos = videos
      console.log(this.videos)
    })
  }

}
