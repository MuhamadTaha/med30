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
      this.messageDetails.id = res.data;
      console.log('response', res)
      console.log('messageDetails', this.messageDetails);
      this.currentTabIndex = this.currentTabIndex + 1;
    })
  }

  onUploadIntroVideo(introVideoPath: any) {
    this.messageDetails.introVideoPath = introVideoPath;
    this.addVideoService.createMessageVideo(this.messageDetails.id, this.messageDetails.introVideoPath).subscribe((res: any) => {
      this.messageDetails.introVideoId = res.data
    })
  }

  onAddSurvey(surveyData: any) {
    const body = {
      id: 0,
      titleEn: surveyData.survey.titleEn,
      titleAr: surveyData.survey.titleAr,
      typeId: surveyData.surveyType,
      messageId: this.messageDetails.id,
      videoIds: [this.messageDetails.introVideoId]
    }
    this.addVideoService.createSurvey(body).subscribe((res: any) => {
      console.log(res)
      if (surveyData.surveyType == 1) this.messageDetails.normalSurveyId = res.data
      else if (surveyData.surveyType == 2) this.messageDetails.feedbackSurveyId = res.data
    })
  }

  handleStep1() { console.log('handleStep1') }

  handleStep2() { console.log('handleStep2') }

}
