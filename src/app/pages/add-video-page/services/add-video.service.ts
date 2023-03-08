import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AddVideoService {
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  getCharacteristicsSections() {
    return this.http.get('http://abdelmageed-001-site15.etempurl.com/api/Characteristics/GetSections')
  }

  getCharacteristicsSectionsItems(sectionId: any) {
    return this.http.get(`http://abdelmageed-001-site15.etempurl.com/api/Characteristics/GetSectionItems?sectionId=${sectionId}`)
  }

  getDoctorsListByCategory(categoryIDs: any) {
    return this.http.post('http://abdelmageed-001-site15.etempurl.com/api/Doctors/GetDoctorsList', categoryIDs)
  }

  uploadFile(file: FormData) {
    return this.http.post('http://abdelmageed-001-site15.etempurl.com/api/Files/Upload', file)
  }
}
