import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-video-details-page',
  templateUrl: './video-details-page.component.html',
  styleUrls: ['./video-details-page.component.scss']
})
export class VideoDetailsPageComponent implements OnInit {

  videosDetails: any
  charts: any;
  videos: any;
  doctorsLike: any;
  doctorsComment: any;

  frequencyData = [
    { number: '90', title: 'Doctors who watch video' },
    { number: '90', title: 'Doctors who like video' },
    { number: '90', title: 'Doctors who comment on video' },
  ]

  constructor(public generalService: GeneralService) { }

  ngOnInit(): void {
    this.getChartsData()
    this.getVideosData()
    this.getDoctorsLike()
    this.getDoctorsComment()
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
      this.videos = videos;
      this.videosDetails = videos[0]
      console.log(this.videos)
    })
  }

  getDoctorsLike() {
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
      this.doctorsLike = doctors
    })
  }

  getDoctorsComment() {
    this.generalService.getDoctorsComment().pipe(
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
      this.doctorsComment = doctors
      console.log('this.doctorsComment', this.doctorsComment)
    })
  }

}
