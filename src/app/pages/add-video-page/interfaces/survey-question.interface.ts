export interface ISurveyRequest {
  id?: number;
  titleEn: string;
  titleAr: string;
  typeId: number;
  messageId: number;
  videoIds: number[];
  questions: IQuestionRequest[]
}

export interface IQuestionRequest {
  id?: number;
  titleEn: string;
  titleAr: string;
  servayId?: number;
  answers: IAnswerRequest[]
}

export interface IAnswerRequest {
  id?: number;
  questionId?: number;
  titleEn: string;
  titleAr: string
}

export interface ISurveyForm {
  question: string;
  answer1: string;
  answer2: string
}
