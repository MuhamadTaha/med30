import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-video-question',
  templateUrl: './add-video-question.component.html',
  styleUrls: ['./add-video-question.component.scss']
})
export class AddVideoQuestionComponent {

  @Input() questionType: number = 0
  @Input() isSurveyAdded = false;
  isQuestionAdded = false;
  isAnswer1Added = false;
  isAnswer2Added = false;

  question = {
    question: {
      en: '',
      ar: '',
      id: '',
    },
    answer1: {
      en: '',
      ar: '',
      id: '',
    },
    answer2: {
      en: '',
      ar: '',
      id: '',
    },
  }

  faCheck = faCheck;

  constructor(private router: Router) { }

  submitQuestion() {
    this.question.question.id = 'question.id'
    this.isQuestionAdded = true
    console.log('question', this.question)
  }

  submitAnswer(answerId: number) {
    if (answerId === 1) {
      this.question.answer1.id = 'answer1.id'
      this.isAnswer1Added = true
    } else if (answerId === 2) {
      this.question.answer2.id = 'answer2.id'
      this.isAnswer2Added = true
    }
    console.log('question', this.question)
  }

}
