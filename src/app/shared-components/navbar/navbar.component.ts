import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  dropdownItems: any[];

  selectedItem: any;

  constructor() {
    this.dropdownItems = [
      { name: 'My Account', route: '/account', icon: '../../../assets/icons/dropdown-profile.png' },
      { name: 'About us', route: '/about-us', icon: '../../../assets/icons/dropdown-about.png' },
      { name: 'Logout', route: '/logout' }
    ];
  }

  ngOnInit(): void {
  }

  onChange(e: any) {
    console.log('e =========> ', e.value)
  }

}
