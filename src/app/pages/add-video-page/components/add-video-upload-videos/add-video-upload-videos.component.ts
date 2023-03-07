import { Component } from '@angular/core';
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
  treeData!: TreeNode[];
  feedbackTreeData!: TreeNode[];
  questionsTypes!: any[];
  selectedQuestionType!: string;
  disableSelectQuestionType = false;
  showUploadVideoDialog = false;

  normalQuestionForm!: FormGroup;
  feedbackQuestionForm!: FormGroup;

  deleteIcon = faTrashAlt;
  addIcon = faPlus;

  feedbackQuestionsList: { question: string; firstAnswer: string; secondeAnswer: string; }[] = [];

  constructor(
    private handleAddVideoDataService: HandleAddVideoDataService,
    private addVideoService: AddVideoService,
  ) { }

  ngOnInit() {
    this.feedbackTreeData = [this.handleAddVideoDataService.getQuestionDataBasedOnType('feedback')]
    this.treeData = this.handleAddVideoDataService.getTreeData()
    this.questionsTypes = this.handleAddVideoDataService.getQuestionsTypes();
    this.formInit()
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
    if (this.feedbackQuestionsList.length < 3) {
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
    console.log('questionForm', questionForm.value)
  }

  showUploadVideoDialogFn() {
    this.showUploadVideoDialog = true
  }

  onDialogClosed(event: any) {
    this.showUploadVideoDialog = false;
  }

}

