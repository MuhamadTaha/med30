import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { } from 'rxjs';
import { IMessageDetails } from '../interfaces/message-details.interface';

@Injectable({
  providedIn: 'root'
})

export class AddVideoService {
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  getSections() {
    return this.http.get('https://comapi.30med.net/api/Characteristics/GetSections').pipe(
      map((res: any) =>
        res.data.map((item: any) => ({
          ...item,
          label: item.name,
          emptyMessage: `no ${item.name}`,
          selectable: false,
          leaf: false,
          children: []
        }))
      ), take(1)
    );
  }

  getSectionsItems(category: string, sectionId: any) {
    return this.http.get(`https://comapi.30med.net/api/Characteristics/GetSectionItems?sectionId=${sectionId}`).pipe(
      map((res: any) =>
        res.data.map((item: any) => ({
          ...item,
          label: item.name,
          category: category
        }))
      ), take(1)
    );
  }

  getDoctorsListByCategory(category: string, categoryIDs: any) {
    return this.http.post('https://comapi.30med.net/api/Doctors/GetDoctorsList', categoryIDs).pipe(
      map((res: any) =>
        res.data.map((item: any) => ({
          ...item,
          label: item.name,
          category: category
        }))
      ), take(1)
    );
  }

  createMessage(body: any) {
    return this.http.post('https://comapi.30med.net/api/Messages/CreateMessage', body).pipe(take(1));
  }

  createMessageVideo(body: any) {
    const restOfBody = {
      id: 0,
      titleEn: "NA",
      titleAr: "NA",
      orderNo: 0,
    }

    return this.http.post('https://comapi.30med.net/api/Messages/CreateMessageVideo',
      { ...body, ...restOfBody }).pipe(take(1));
  }

  createSurvey(body: any) {
    return this.http.post('https://comapi.30med.net/api/MessageSurvays/CreateSurvay', body).pipe(take(1));
  }

  createSurveyQuestion(body: any) {
    return this.http.post('https://comapi.30med.net/api/MessageSurvays/CreateSurvayQuestion', body).pipe(take(1));
  }

  createSurveyQuestionAnswer(body: any) {
    return this.http.post('https://comapi.30med.net/api/MessageSurvays/CreateSurvayQuestionAnswer', body).pipe(take(1));
  }


  uploadFile(file: FormData) {
    return this.http.post('https://comapi.30med.net/api/Files/Upload', file)
  }
}
