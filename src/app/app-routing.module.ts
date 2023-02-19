import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsCardComponent } from './shared-components/cards/doctors-card/doctors-card.component';
import { VideosListCardComponent } from './shared-components/cards/videos-list-card/videos-list-card.component';


const routes: Routes = [
  { path: '', component: DoctorsCardComponent },
  { path: 'videos', component: VideosListCardComponent },
  { path: 'videos/:id', component: VideosListCardComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
