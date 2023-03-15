import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ISurveyForm } from '../../interfaces/survey-question.interface';

@Component({
  selector: 'app-add-video-question',
  templateUrl: './add-video-question.component.html',
  styleUrls: ['./add-video-question.component.scss']
})
export class AddVideoQuestionComponent {

  @Input() surveyType: number = 0

  @Output() onSubmitSurveyEvent = new EventEmitter<any>();

  feedbackQuestionsList: ISurveyForm[] = [];

  data = {
    question: '',
    answer1: '',
    answer2: '',
  }

  deleteIcon = faTrashAlt;
  addIcon = faPlus;

  constructor() { }
  ngOnInit() { this.addFeedbackQuestion() }


  addFeedbackQuestion() {
    if (this.feedbackQuestionsList.length < 5) {
      const feedbackQuestion: ISurveyForm = { question: '', answer1: '', answer2: '' }
      this.feedbackQuestionsList.push(feedbackQuestion)
      // const length = this.feedbackQuestionsList.length
      // this.feedbackSurveyForm.addControl(`question_${length}`, new FormControl(''))
      // this.feedbackSurveyForm.addControl(`firstAnswer_${length}`, new FormControl(''))
      // this.feedbackSurveyForm.addControl(`secondeAnswer_${length}`, new FormControl(''))
    }
  }

  deleteFeedbackQuestion() {
    if (this.feedbackQuestionsList.length) {
      // const length = this.feedbackQuestionsList.length
      // this.feedbackQuestionsList.splice(-1)
      // this.feedbackSurveyForm.removeControl(`question_${length}`)
      // this.feedbackSurveyForm.removeControl(`firstAnswer_${length}`)
      // this.feedbackSurveyForm.removeControl(`secondeAnswer_${length}`)
    }
  }

  submitSurvey(data: ISurveyForm[]) {
    this.onSubmitSurveyEvent.emit({ questionsList: [...data], type: this.surveyType })
  }

}
