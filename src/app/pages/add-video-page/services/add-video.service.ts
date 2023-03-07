import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AddVideoService {
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }
}
