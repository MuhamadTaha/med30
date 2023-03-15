import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  dropdownSelectedItem!: any;

  dropdownItems = [
    { name: 'My Account', route: '/profile', icon: '../../../assets/icons/dropdown-profile.png' },
    // { name: 'About us', route: '/about', icon: '../../../assets/icons/dropdown-about.png' },
    { name: 'Logout', route: '/logout' }
  ];

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void { }

  onChange(e: any) {
    if (e.value.route == this.dropdownItems[1].route) {
      this.authService.logout();
    } else {
      this.router.navigate([e.value.route])
      console.log(this.dropdownSelectedItem)
      this.dropdownSelectedItem = {};
      console.log(this.dropdownSelectedItem)
    }
  }

}
