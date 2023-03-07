import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AddVideoService {
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  uploadFile(file: FormData) {
    return this.http.post('http://abdelmageed-001-site15.etempurl.com/api/Files/Upload', file)
  }
}
