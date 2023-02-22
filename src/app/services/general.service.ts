import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient,) { }

  getCharts() {
    return this.http.get('https://med30-med30-default-rtdb.firebaseio.com/charts.json')
  }

  getDoctors() {
    return this.http.get('https://med30-med30-default-rtdb.firebaseio.com/doctors.json')
  }

  getVideos() {
    return this.http.get('https://med30-med30-default-rtdb.firebaseio.com/videos.json')
  }

}
