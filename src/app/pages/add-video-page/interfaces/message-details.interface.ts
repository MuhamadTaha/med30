export interface IMessageDetails {
  id?: number | any | any;
  introVideoPath?: string | any | any;
  introVideoId?: number | any;
  normalSurveyId?: number | any;
  normalQuestionId?: number | any;
  normalAnswer1Id?: number | any;
  normalAnswer2Id?: number | any;
  normalAnswer1VideoId?: number | any;
  normalAnswer2VideoId?: number | any;
  feedbackSurveyId?: number | any;
  feedbackSurvey?: IFeedbackSurvey[] | any;
}

interface IFeedbackSurvey {
  questionId?: number | any;
  answer1Id?: number | any;
  answer2Id?: number | any;
}
