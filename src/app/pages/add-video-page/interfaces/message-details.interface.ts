export interface IMessageDetails {
  messageId?: number | any | any;
  introVideoPath?: string | any | any;
  introVideoId?: number | any;
  normalSurveyId?: number | any;
  normalQuestion?: INormalQuestion | any;
  feedbackSurveyId?: number | any;
  feedbackVideoPath?: number | any;
  feedbackVideoId?: number | any;
  feedbackQuestion?: IFeedbackQuestion[] | any;
}

interface IFeedbackQuestion {
  questionId?: number | any;
  answer1Id?: number | any;
  answer2Id?: number | any;
}
interface INormalQuestion {
  questionId?: number | any;
  answer1Id?: number | any;
  answer1VideoPath?: string | any | any;
  answer1VideoId?: number | any;
  answer2Id?: number | any;
  answer2VideoPath?: string | any | any;
  answer2VideoId?: number | any;
}
