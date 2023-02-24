import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

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

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void { }

  onChange(e: any) {
    if (e.value.route == this.dropdownItems[2].route) {
      this.authService.logout();
    } else {
      this.router.navigate([e.value.route])
    }
  }

}
