export interface IQuiz {
  id: string;
  text: string;
  hint: string;
}

export interface IMultipleChoiceQuiz extends IQuiz {
  options: (string | number | boolean)[];
  correctOptions: boolean[];
  explanation: string;
}

export interface ICodingQuiz extends IQuiz {}
