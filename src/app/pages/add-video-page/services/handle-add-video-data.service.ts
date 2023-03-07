import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class HandleAddVideoDataService {
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  questionsTypes = [
    { name: 'Normal', value: 'normal' },
    { name: 'Feedback', value: 'feedback' },
  ]

  treeData = [{
    label: 'Upload Introduction video',
    type: 'upload-video',
    expanded: true,
    children: [
      {

        label: 'Select Question Type',
        type: 'select-question-type',
        expanded: true,
        children: [
        ]
      },
    ]
  }]

  normalQuestion = {
    label: 'Normal Question',
    type: 'question',
    questionType: 'normal',
    expanded: true,
    children: [
      {
        label: 'Upload video for first answer',
        type: 'upload-video',
        expanded: true,
      },
      {
        label: 'Upload video for seconde answer',
        type: 'upload-video',
        expanded: true,
      },
    ],

  }

  feedbackQuestion = {
    label: 'Feedback Question',
    type: 'question',
    questionType: 'feedback',
    expanded: true,
    children: [{
      label: 'Upload Feedback Video',
      type: 'upload-video',
      expanded: true,
    }],
  }

  getQuestionDataBasedOnType(type: string) {
    if (type === 'feedback') return this.feedbackQuestion
    else if (type === 'normal') return this.normalQuestion
    else return {}
  }

  getTreeData() { return this.treeData }

  getQuestionsTypes() { return this.questionsTypes }

}
