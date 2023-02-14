import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalysisCardComponent } from './shared-components/analysis-card/analysis-card.component';
import { DoctorsCardComponent } from './shared-components/doctors-card/doctors-card.component';
import { VideosListCardComponent } from './shared-components/videos-list-card/videos-list-card.component';
import { FrequencyCardComponent } from './shared-components/frequency-card/frequency-card.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    AnalysisCardComponent,
    DoctorsCardComponent,
    VideosListCardComponent,
    FrequencyCardComponent,
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
