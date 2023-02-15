import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalysisCardComponent } from './shared-components/cards/analysis-card/analysis-card.component';
import { DoctorsCardComponent } from './shared-components/cards/doctors-card/doctors-card.component';
import { VideosListCardComponent } from './shared-components/cards/videos-list-card/videos-list-card.component';
import { FrequencyCardComponent } from './shared-components/cards/frequency-card/frequency-card.component';
import { ChartModule } from 'primeng/chart';
import { NavbarComponent } from './shared-components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalysisCardComponent,
    DoctorsCardComponent,
    VideosListCardComponent,
    FrequencyCardComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
