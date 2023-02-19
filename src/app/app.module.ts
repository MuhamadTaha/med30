import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalysisCardComponent } from './shared-components/cards/analysis-card/analysis-card.component';
import { DoctorsCardComponent } from './shared-components/cards/doctors-card/doctors-card.component';
import { VideosListCardComponent } from './shared-components/cards/videos-list-card/videos-list-card.component';
import { FrequencyCardComponent } from './shared-components/cards/frequency-card/frequency-card.component';
import { ChartModule } from 'primeng/chart';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { DropdownModule } from 'primeng/dropdown';
import { VideoDetailsPageComponent } from './pages/video-details-page/video-details-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { VideosListPageComponent } from './pages/videos-list-page/videos-list-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalysisCardComponent,
    DoctorsCardComponent,
    VideosListCardComponent,
    FrequencyCardComponent,
    NavbarComponent,
    VideoDetailsPageComponent,
    ProfilePageComponent,
    VideosListPageComponent,
    HomePageComponent,
    LoginPageComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
