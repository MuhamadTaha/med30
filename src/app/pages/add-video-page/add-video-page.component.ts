import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddVideoService } from './services/add-video.service';
import { IMessageDetails } from './interfaces/message-details.interface';

@Component({
  selector: 'app-add-video-page',
  templateUrl: './add-video-page.component.html',
  styleUrls: ['./add-video-page.component.scss']
})
export class AddVideoPageComponent {

  messageDetails: IMessageDetails = {} as IMessageDetails

  questionId = 0;

  currentTabIndex: number = 0;
  currentStep!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private addVideoService: AddVideoService,

  ) { }

  ngOnInit() {
    this.checkActiveRoute()
  }

  checkActiveRoute() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentStep = params['step'];
      this.currentTabIndex = Number(this.currentStep.slice(5, 6)) - 1
    });
    this.addStepQueryParam(this.currentTabIndex + 1);
  }

  onTabChange(event: any) {
    this.addStepQueryParam(event.index + 1)
  }

  addStepQueryParam(stepIndex: any) {
    this.router.navigate([], {
      queryParams: {
        step: `step-${stepIndex}`
      },
    });
  }

  nextStepClicked() {
    switch (this.currentTabIndex) {
      case 0:
        this.handleStep1()
        break
      case 1:
        this.handleStep2()
        break
      default:
        break
    }
    this.currentTabIndex = this.currentTabIndex + 1
    console.log('nextStep')
  }

  submitDoctorsList(request: any) {
    console.log('step 1 api request', request)
    this.addVideoService.createMessage(request).subscribe((res: any) => {
      this.messageDetails.messageId = res.data;
      console.log('response', res)
      console.log('messageDetails', this.messageDetails);
      this.currentTabIndex = this.currentTabIndex + 1;
    })
  }

  onUploadIntroVideo(introVideoDetails: any) {
    console.log('onUploadIntroVideo', introVideoDetails)
    const body = {
      filePath: introVideoDetails.data,
      messageId: this.messageDetails.messageId,
    }
    this.messageDetails.introVideoPath = introVideoDetails.data;
    this.addVideoService.createMessageVideo(body).subscribe((res: any) => {
      this.messageDetails.introVideoId = res.data
    })
  }

  onUploadAnswer1Video(answer1VideoDetails: any) {
    console.log('answer1VideoDetails', answer1VideoDetails)
    const body = {
      filePath: answer1VideoDetails.data,
      messageId: this.messageDetails.messageId,
      answerId: this.messageDetails.normalQuestion.answer1Id,
    }
    console.log('answer1VideoDetails', body)

    this.messageDetails.normalQuestion.answer1VideoPath = answer1VideoDetails.data;
    this.addVideoService.createMessageVideo(body).subscribe((res: any) => {
      this.messageDetails.introVideoId = res.data
    })
  }

  onUploadAnswer2Video(answer2VideoDetails: any) {
    console.log('answer2VideoDetails', answer2VideoDetails)
    const body = {
      filePath: answer2VideoDetails.data,
      messageId: this.messageDetails.messageId,
      answerId: this.messageDetails.normalQuestion.answer2Id,
    }
    console.log('answer2VideoDetails', body)

    this.messageDetails.normalQuestion.answer2VideoPath = answer2VideoDetails.data;
    this.addVideoService.createMessageVideo(body).subscribe((res: any) => {
      this.messageDetails.introVideoId = res.data
    })
  }

  onUploadFeedbackVideo(feedbackVideoDetails: any) {
    const body = {
      filePath: feedbackVideoDetails.data,
      messageId: this.messageDetails.messageId,
      surveyId: this.messageDetails.feedbackSurveyId
    }
    this.messageDetails.feedbackVideoPath = feedbackVideoDetails.data;
    this.addVideoService.createMessageVideo(body).subscribe((res: any) => {
      this.messageDetails.introVideoId = res.data
    })
  }

  onAddSurvey(surveyData: any) {
    const videoIds = [];

    if (surveyData.surveyType == 1) {
      videoIds.push(this.messageDetails.introVideoId)
    } else if (surveyData.surveyType == 2) {
      if (this.messageDetails.normalQuestion.answer1Id && this.messageDetails.normalQuestion.answer2Id) {
        videoIds.push(this.messageDetails.normalQuestion.answer1Id)
        videoIds.push(this.messageDetails.normalQuestion.answer2Id)
      } else {
        videoIds.push(this.messageDetails.introVideoId)
      }
    }

    const body = {
      id: 0,
      titleEn: surveyData.survey.titleEn,
      titleAr: surveyData.survey.titleAr,
      typeId: surveyData.surveyType,
      messageId: this.messageDetails.messageId,
      videoIds: videoIds
    }
    this.addVideoService.createSurvey(body).subscribe((res: any) => {
      console.log(res)
      if (surveyData.surveyType == 1) this.messageDetails.normalSurveyId = res.data
      else if (surveyData.surveyType == 2) this.messageDetails.feedbackSurveyId = res.data
    })
  }

  onAddQuestion(questionData: any) {
    console.log('questionData', questionData)
    const body = {
      id: 0,
      titleEn: questionData.en,
      titleAr: questionData.ar,
      servayId: questionData.type == 1 ? this.messageDetails.normalSurveyId : this.messageDetails.feedbackSurveyId,
    }
    this.addVideoService.createSurveyQuestion(body).subscribe((res: any) => {
      console.log('createSurvayQuestion', res)
      this.questionId = res.data
      if (questionData.type == 1) {
        this.messageDetails.normalQuestion = {}
        this.messageDetails.normalQuestion.questionId = res.data
      }
      else if (questionData.type == 2) {
        if (!this.messageDetails.feedbackQuestion) this.messageDetails.feedbackQuestion = []
        this.messageDetails.feedbackQuestion.push({ questionId: res.data })
      }
    })
  }

  onAddAnswer(answerData: any) {
    console.log('answerData', answerData)
    const body = {
      id: 0,
      titleEn: answerData.en,
      titleAr: answerData.ar,
      questionId: answerData.questionId
    }
    this.addVideoService.createSurveyQuestionAnswer(body).subscribe((res: any) => {
      console.log(res)
      if (answerData.questionType == 1) {
        if (answerData.type == 1) this.messageDetails.normalQuestion.answer1Id = res.data
        else if (answerData.type == 2) this.messageDetails.normalQuestion.answer2Id = res.data
      } else if (answerData.questionType == 2) {
        this.messageDetails.feedbackQuestion.forEach((element: any) => {
          console.log('element.questionId', element.questionId)
          console.log('answerData.questionId', answerData.questionId)
          if (element.questionId == answerData.questionId) {
            if (answerData.type == 1) element.answer1Id = res.data
            else if (answerData.type == 2) element.answer2Id = res.data
          }
        });
      }
    })
  }

  handleStep1() { console.log('handleStep1') }

  handleStep2() { console.log('handleStep2') }

}
