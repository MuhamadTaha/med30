import { Component } from '@angular/core';
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

  feedbackQuestionsList: { question: string; firstAnswer: string; secondeAnswer: string; }[] = [];

  constructor(
    private handleAddVideoDataService: HandleAddVideoDataService,
    private addVideoService: AddVideoService,
  ) { }

  ngOnInit() {
    this.feedbackTreeData = [this.handleAddVideoDataService.getQuestionDataBasedOnType('feedback')]
    this.treeData = this.handleAddVideoDataService.getTreeData()
    this.questionsTypes = this.handleAddVideoDataService.getQuestionsTypes()
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
    const feedbackQuestion = { question: 'question', firstAnswer: 'firstAnswer', secondeAnswer: 'secondeAnswer' }
    this.feedbackQuestionsList.push(feedbackQuestion)
  }

  submitQuestion() {
    this.disableSelectQuestionType = !this.disableSelectQuestionType
  }

}
