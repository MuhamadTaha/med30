import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesLayoutComponent } from './pages-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { VideoDetailsPageComponent } from './video-details-page/video-details-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { VideosListPageComponent } from './videos-list-page/videos-list-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AddVideoPageComponent } from './add-video-page/add-video-page.component';

import { NavbarComponent } from '../shared-components/navbar/navbar.component';
import { AddVideoChooseAudienceComponent } from './components/add-video-choose-audience/add-video-choose-audience.component';
import { AddVideoUploadVideosComponent } from './components/add-video-upload-videos/add-video-upload-videos.component';
import { AddVideoSubmissionsComponent } from './components/add-video-submissions/add-video-submissions.component';
import { AddVideoDialogComponent } from './components/add-video-dialog/add-video-dialog.component';

import { AnalysisCardComponent } from '../shared-components/cards/analysis-card/analysis-card.component';
import { DoctorsCardComponent } from '../shared-components/cards/doctors-card/doctors-card.component';
import { VideosListCardComponent } from '../shared-components/cards/videos-list-card/videos-list-card.component';
import { FrequencyCardComponent } from '../shared-components/cards/frequency-card/frequency-card.component';
import { VideoDetailsCardComponent } from '../shared-components/cards/video-details-card/video-details-card.component';

import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { OrganizationChartModule } from 'primeng/organizationchart';

import { AuthGuard } from '../auth/guards/auth.guard';
import { DisableControlDirective } from '../directives/disable-control.directive';


const routes: Routes = [
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
      { path: 'about', component: AboutPageComponent, canActivate: [AuthGuard], },
      { path: 'videos', component: VideosListPageComponent, canActivate: [AuthGuard], },
      { path: 'videos/:id', component: VideoDetailsPageComponent, canActivate: [AuthGuard], },
      { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard], },
      { path: 'add-video', component: AddVideoPageComponent, canActivate: [AuthGuard], },
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
  AddVideoPageComponent,
  // shared components
  NavbarComponent,
  AddVideoChooseAudienceComponent,
  AddVideoUploadVideosComponent,
  AddVideoSubmissionsComponent,
  // cards
  AnalysisCardComponent,
  DoctorsCardComponent,
  VideosListCardComponent,
  VideoDetailsCardComponent,
  FrequencyCardComponent,
]

@NgModule({
  declarations: [
    DisableControlDirective,
    PagesLayoutComponent,
    ...components,
    AddVideoDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule,
    FormsModule,
    DropdownModule,
    SelectButtonModule,
    FileUploadModule,
    OrganizationChartModule,
    DialogModule,
    TreeModule,
    InputTextareaModule,
    TabViewModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesLayoutModule { }
