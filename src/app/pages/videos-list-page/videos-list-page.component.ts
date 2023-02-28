import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { faThLarge, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-videos-list-page',
  templateUrl: './videos-list-page.component.html',
  styleUrls: ['./videos-list-page.component.scss']
})
export class VideosListPageComponent implements OnInit {

  charts: any;
  videos: any;

  showAddVideoDialog: boolean = false;
  videoListTheme: any = 'linear';

  icons = {
    faThLarge: faThLarge,
    faBars: faBars
  };

  layoutOptions = [
    { label: this.icons.faThLarge, value: 'grid' },
    { label: this.icons.faBars, value: 'linear' },
  ];

  timeOptions = [
    { label: 'Upcomming', value: 'upcomming' },
    { label: 'Previous', value: 'previous' },
  ];

  layoutOptionsValue: any = 'linear'
  timeOptionsValue: any = 'upcomming'

  constructor(public generalService: GeneralService) { }

  ngOnInit(): void {
    this.getChartsData()
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

  onLayoutOptionChange(e: any) {
    this.videoListTheme = e.value
  }

  onTimeOptionChange(e: any) {
    console.log('e', e)
  }

  showAddVideoDialogFn() {
    this.showAddVideoDialog = true
  }

}
