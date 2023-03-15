import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { IMessageDetails } from '../../interfaces/message-details.interface';
import { AddVideoService } from '../../services/add-video.service';
import { HandleAddVideoDataService } from '../../services/handle-add-video-data.service';

@Component({
  selector: 'app-add-video-upload-videos',
  templateUrl: './add-video-upload-videos.component.html',
  styleUrls: ['./add-video-upload-videos.component.scss']
})
export class AddVideoUploadVideosComponent {

  @Input() messageDetails!: IMessageDetails;
  @Input() questionId!: number;
  @Output() introVideoPathEvent = new EventEmitter<any>();
  @Output() answer1VideoPathEvent = new EventEmitter<any>();
  @Output() answer2VideoPathEvent = new EventEmitter<any>();
  @Output() feedbackVideoPathEvent = new EventEmitter<any>();
  @Output() addSurveyEvent = new EventEmitter<any>();

  treeData!: TreeNode[];
  feedbackTreeData!: TreeNode[];

  surveysTypes!: any[];
  selectedSurveyType!: string;
  disableSelectSurveyType = false;
  showUploadVideoDialog = false;
  videoType: string = "intro";

  normalSurveyForm!: FormGroup;
  feedbackSurveyForm!: FormGroup;

  isVideoUploaded = {
    intro: false,
    answer1: false,
    answer2: false,
    feedback: false
  }

  isNormalSurveyAdded = false;
  isFeedbackSurveyAdded = false;

  constructor(
    private handleAddVideoDataService: HandleAddVideoDataService,
    private addVideoService: AddVideoService,
  ) { }

  ngOnInit() {
    this.feedbackTreeData = [this.handleAddVideoDataService.getSurveyDataBasedOnType('feedback')]
    this.treeData = this.handleAddVideoDataService.getTreeData()
    this.surveysTypes = this.handleAddVideoDataService.getSurveysTypes();
    this.formInit();
  }

  formInit() {
    this.normalSurveyForm = new FormGroup({
      'question': new FormControl(''),
      'firstAnswer': new FormControl(''),
      'secondeAnswer': new FormControl(''),
    })
    this.feedbackSurveyForm = new FormGroup({})
  }

  onSurveyTypeChange(event: any) {
    // this.feedbackQuestionsList = []
    const question = this.handleAddVideoDataService.getSurveyDataBasedOnType(event.value)
    if (this.treeData[0].children) {
      this.treeData[0].children[0].children = []
      if (event.value === 'normal') this.treeData[0].children[0].children.push(question)
    }
  }

  submitSurvey(surveyForm: FormGroup) {
    this.disableSelectSurveyType = !this.disableSelectSurveyType;
  }

  showUploadVideoDialogFn(videoType: string) {
    this.videoType = videoType;
    this.showUploadVideoDialog = true
  }

  onDialogClosed(event: any) {
    this.showUploadVideoDialog = false;
  }

  onUploadVideo(uploadFileResponse: any) {
    console.log('uploadFileResponse', uploadFileResponse);
    switch (uploadFileResponse.type) {
      case 'intro': {
        this.isVideoUploaded.intro = true;
        this.introVideoPathEvent.emit(uploadFileResponse)
        break;
      }
      case 'answer1': {
        this.isVideoUploaded.answer1 = true;
        this.answer1VideoPathEvent.emit(uploadFileResponse)
        break;
      }
      case 'answer2': {
        this.isVideoUploaded.answer2 = true;
        this.answer2VideoPathEvent.emit(uploadFileResponse)
        break;
      }
      case 'feedback': {
        this.isVideoUploaded.feedback = true;
        this.feedbackVideoPathEvent.emit(uploadFileResponse)
        break;
      }
      default:
        break;
    }
  }

  onAddSurvey(surveyData: any) {
    this.addSurveyEvent.emit(surveyData)
  }


  continueLater() {
    console.log('continueLater')
  }

  cancelRequest() {
    console.log('cancelRequest')
  }

  submitVideos(data: any) {
    console.log('submitVideos', data)
    // this.onSubmitDoctorsList.emit(form.value);
  }
}
