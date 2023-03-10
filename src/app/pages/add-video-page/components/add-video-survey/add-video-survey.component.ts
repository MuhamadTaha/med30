import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-video-survey',
  templateUrl: './add-video-survey.component.html',
  styleUrls: ['./add-video-survey.component.scss']
})
export class AddVideoSurveyComponent {

  @Input() surveyType: number = 0

  @Input() isSurveyAdded: boolean = false;
  @Output() onAddSurvey = new EventEmitter<any>();

  survey = {
    titleEn: '',
    titleAr: '',
    id: '',
  }

  faCheck = faCheck;

  constructor(private router: Router) { }

  submitSurvey() {
    this.onAddSurvey.emit({ surveyType: this.surveyType, isSurveyAdded: true });
    this.isSurveyAdded = true;
    console.log('survey', this.survey)
  }

}
