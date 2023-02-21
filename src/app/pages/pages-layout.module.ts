import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesLayoutComponent } from './pages-layout.component';
import { RouterModule, Routes } from '@angular/router';

import { VideoDetailsPageComponent } from './video-details-page/video-details-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { VideosListPageComponent } from './videos-list-page/videos-list-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

import { NavbarComponent } from '../shared-components/navbar/navbar.component';
import { AnalysisCardComponent } from '../shared-components/cards/analysis-card/analysis-card.component';
import { DoctorsCardComponent } from '../shared-components/cards/doctors-card/doctors-card.component';
import { VideosListCardComponent } from '../shared-components/cards/videos-list-card/videos-list-card.component';
import { FrequencyCardComponent } from '../shared-components/cards/frequency-card/frequency-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { AuthGuard } from '../auth/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
      { path: 'about-us', component: AboutPageComponent },
      {
        path: 'videos', component: VideosListPageComponent,
        children: [
          { path: 'videos/:id', component: VideoDetailsPageComponent }
        ],
      },
      { path: 'profile', component: ProfilePageComponent },
    ]
  }

];

const components = [
  // pages
  HomePageComponent,
  VideosListPageComponent,
  VideoDetailsPageComponent,
  ProfilePageComponent,
  AboutPageComponent,
  NavbarComponent,
  // cards
  AnalysisCardComponent,
  DoctorsCardComponent,
  VideosListCardComponent,
  FrequencyCardComponent,
]

@NgModule({
  declarations: [
    PagesLayoutComponent,
    ...components
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule,
    DropdownModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesLayoutModule { }
