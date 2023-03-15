import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddVideoService } from './services/add-video.service';
import { IMessageDetails } from './interfaces/message-details.interface';
import { IAnswerRequest, IQuestionRequest, ISurveyForm, ISurveyRequest } from './interfaces/survey-question.interface';

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

  onAddSurvey(data: { questionsList: ISurveyForm[], type: number }) {
    console.log('data', data)

    const body: ISurveyRequest = {
      titleEn: "NA",
      titleAr: "NA",
      typeId: data.type,
      messageId: 0,
      videoIds: [],
      questions: []
    }

    if (data.type === 1) {
      body.videoIds = []
      body.videoIds.push(this.messageDetails.introVideoId || 11)
    } else if (data.type === 2) {
      if (this.messageDetails.normalQuestion?.answer1Id && this.messageDetails.normalQuestion?.answer2Id) {
        body.videoIds = []
        body.videoIds.push(this.messageDetails.normalQuestion.answer1Id, this.messageDetails.normalQuestion.answer2Id)
      } else {
        body.videoIds = []
        body.videoIds.push(this.messageDetails.introVideoId || 22)
      }
    }

    data.questionsList.forEach((element: ISurveyForm) => {
      let answer1: IAnswerRequest = {
        titleEn: element.answer1,
        titleAr: element.answer1
      }
      let answer2: IAnswerRequest = {
        titleEn: element.answer2,
        titleAr: element.answer2,
      }
      let question: IQuestionRequest = {
        titleEn: element.question,
        titleAr: element.question,
        answers: [answer1, answer2]
      }
      body.questions.push(question)
    });

    console.log('body ====> ', body)
    // this.addVideoService.createSurvey(body).subscribe((res: any) => {
    //   console.log('createSurvey', res)
    //   // this.questionId = res.data
    //   // if (data.type == 1) {
    //   //   this.messageDetails.normalQuestion = {}
    //   //   this.messageDetails.normalQuestion.questionId = res.data
    //   // }
    //   // else if (data.type == 2) {
    //   //   if (!this.messageDetails.feedbackQuestion) this.messageDetails.feedbackQuestion = []
    //   //   this.messageDetails.feedbackQuestion.push({ questionId: res.data })
    //   // }
    // })
  }

  handleStep1() { console.log('handleStep1') }

  handleStep2() { console.log('handleStep2') }

  test() {
    console.log('this.messageDetails', this.messageDetails)
  }


}
