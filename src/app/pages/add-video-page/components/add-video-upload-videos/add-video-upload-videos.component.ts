import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TreeNode } from 'primeng/api';
import { AddVideoService } from '../../services/add-video.service';
import { HandleAddVideoDataService } from '../../services/handle-add-video-data.service';

@Component({
  selector: 'app-add-video-upload-videos',
  templateUrl: './add-video-upload-videos.component.html',
  styleUrls: ['./add-video-upload-videos.component.scss']
})
export class AddVideoUploadVideosComponent {

  @Input() messageDetails!: any;
  @Input() questionId!: number;
  @Output() introVideoPathEvent = new EventEmitter<any>();
  @Output() answer1VideoPathEvent = new EventEmitter<any>();
  @Output() answer2VideoPathEvent = new EventEmitter<any>();
  @Output() feedbackVideoPathEvent = new EventEmitter<any>();
  @Output() addSurveyEvent = new EventEmitter<any>();
  @Output() addQuestionEvent = new EventEmitter<any>();
  @Output() addAnswerEvent = new EventEmitter<any>();

  treeData!: TreeNode[];
  feedbackTreeData!: TreeNode[];
  questionsTypes!: any[];
  selectedQuestionType!: string;
  disableSelectQuestionType = false;
  showUploadVideoDialog = false;
  videoType: string = "intro";

  normalQuestionForm!: FormGroup;
  feedbackQuestionForm!: FormGroup;

  deleteIcon = faTrashAlt;
  addIcon = faPlus;

  isVideoUploaded = {
    intro: false,
    answer1: false,
    answer2: false,
    feedback: false
  }

  isNormalSurveyAdded = false;
  isFeedbackSurveyAdded = false;

  feedbackQuestionsList: { question: string; firstAnswer: string; secondeAnswer: string; }[] = [];

  constructor(
    private handleAddVideoDataService: HandleAddVideoDataService,
    private addVideoService: AddVideoService,
  ) { }

  ngOnInit() {
    this.feedbackTreeData = [this.handleAddVideoDataService.getQuestionDataBasedOnType('feedback')]
    this.treeData = this.handleAddVideoDataService.getTreeData()
    this.questionsTypes = this.handleAddVideoDataService.getQuestionsTypes();
    this.formInit();
    this.test();
  }

  test() {
    console.log('this.messageDetails', this.messageDetails)
  }
  formInit() {
    this.normalQuestionForm = new FormGroup({
      'question': new FormControl(''),
      'firstAnswer': new FormControl(''),
      'secondeAnswer': new FormControl(''),
    })
    this.feedbackQuestionForm = new FormGroup({})
  }

  onQuestionTypeChange(event: any) {
    this.feedbackQuestionsList = []
    const question = this.handleAddVideoDataService.getQuestionDataBasedOnType(event.value)
    if (this.treeData[0].children) {
      this.treeData[0].children[0].children = []
      if (event.value === 'normal') this.treeData[0].children[0].children.push(question)
    }
  }

  addFeedbackQuestion() {
    if (this.feedbackQuestionsList.length < 5) {
      const feedbackQuestion = { question: 'question', firstAnswer: 'firstAnswer', secondeAnswer: 'secondeAnswer' }
      this.feedbackQuestionsList.push(feedbackQuestion)
      const length = this.feedbackQuestionsList.length
      this.feedbackQuestionForm.addControl(`question_${length}`, new FormControl(''))
      this.feedbackQuestionForm.addControl(`firstAnswer_${length}`, new FormControl(''))
      this.feedbackQuestionForm.addControl(`secondeAnswer_${length}`, new FormControl(''))
    }
  }

  deleteFeedbackQuestion() {
    if (this.feedbackQuestionsList.length) {
      const length = this.feedbackQuestionsList.length
      this.feedbackQuestionsList.splice(-1)
      this.feedbackQuestionForm.removeControl(`question_${length}`)
      this.feedbackQuestionForm.removeControl(`firstAnswer_${length}`)
      this.feedbackQuestionForm.removeControl(`secondeAnswer_${length}`)
    }
  }

  submitQuestion(questionForm: FormGroup) {
    this.disableSelectQuestionType = !this.disableSelectQuestionType;
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
    if (surveyData.surveyType == 1) {
      this.isNormalSurveyAdded = surveyData.isSurveyAdded
    } else if (surveyData.surveyType == 2) {
      this.isFeedbackSurveyAdded = surveyData.isSurveyAdded
    }
    this.addSurveyEvent.emit(surveyData)
  }
  onAddQuestion(questionData: any) {
    this.addQuestionEvent.emit(questionData)
  }
  onAddAnswer(answerData: any) {
    this.addAnswerEvent.emit(answerData)
  }
}
