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
  @Input() questionId!: number;

  @Output() onAddQuestionEvent = new EventEmitter<any>();
  @Output() onAddAnswerEvent = new EventEmitter<any>();

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
    this.isQuestionAdded = true;
    this.onAddQuestionEvent.emit({ ...this.question.question, type: this.questionType })
  }

  submitAnswer(answerId: number) {
    if (answerId === 1) {
      this.isAnswer1Added = true;
      this.onAddAnswerEvent.emit({ ...this.question.answer1, type: answerId, questionType: this.questionType, questionId: this.questionId })

    } else if (answerId === 2) {
      this.isAnswer2Added = true
      this.onAddAnswerEvent.emit({ ...this.question.answer2, type: answerId, questionType: this.questionType, questionId: this.questionId })
    }
  }

}
