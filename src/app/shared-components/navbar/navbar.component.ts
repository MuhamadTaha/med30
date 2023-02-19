import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  dropdownItems = [
    { name: 'My Account', route: '/profile', icon: '../../../assets/icons/dropdown-profile.png' },
    { name: 'About us', route: '/about-us', icon: '../../../assets/icons/dropdown-about.png' },
    { name: 'Logout', route: '/logout' }
  ];

  constructor(public router: Router) { }

  ngOnInit(): void {}

  onChange(e: any) {
    this.router.navigate([e.value.route])
  }

}
