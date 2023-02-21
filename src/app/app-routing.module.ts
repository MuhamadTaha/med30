import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { VideoDetailsPageComponent } from './pages/video-details-page/video-details-page.component';
import { VideosListPageComponent } from './pages/videos-list-page/videos-list-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about-us', component: AboutPageComponent },
  { path: 'videos', component: VideosListPageComponent },
  { path: 'videos/:id', component: VideoDetailsPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
