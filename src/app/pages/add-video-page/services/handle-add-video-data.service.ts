import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class HandleAddVideoDataService {
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  surveysTypes = [
    { name: 'Normal', value: 'normal' },
    { name: 'Feedback', value: 'feedback' },
  ]

  treeData = [{
    label: 'Upload Introduction video',
    type: 'upload-video',
    subType: 'intro',
    expanded: true,
    children: [
      {
        type: 'select-survey-type',
        expanded: true,
        children: [
        ]
      },
    ]
  }]

  normalSurvey = {
    label: 'Normal',
    type: 'survey',
    surveyType: 'normal',
    expanded: true,
    children: [
      {
        label: 'Upload video for first answer',
        type: 'upload-video',
        subType: 'answer1',
        expanded: true,
      },
      {
        label: 'Upload video for seconde answer',
        type: 'upload-video',
        subType: 'answer2',
        expanded: true,
      },
    ],

  }

  feedbackSurvey = {
    label: 'Feedback',
    type: 'survey',
    surveyType: 'feedback',
    expanded: true,
    children: [{
      label: 'Upload Feedback Video',
      type: 'upload-video',
      subType: 'feedback',
      expanded: true,
    }],
  }

  getSurveyDataBasedOnType(type: string) {
    if (type === 'feedback') return this.feedbackSurvey
    else if (type === 'normal') return this.normalSurvey
    else return {}
  }

  getTreeData() { return this.treeData }

  getSurveysTypes() { return this.surveysTypes }

}
