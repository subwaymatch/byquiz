export enum QuizType {
  MultipleChoice = 'multiple-choice',
  FreeResponse = 'free-response',
  CodingPython = 'coding-python',
  CodingSQL = 'coding-sql',
}

export interface IQuiz {
  type: QuizType;
  id: string;
  text: string;
  hint?: string;
  explanation: string;
}

export interface ICodingQuiz extends IQuiz {
  type: QuizType;
  runBefore: string;
  beginningCode: string;
  runAfter: string;
  checkCode: string;
}

export interface IMultipleChoiceQuiz extends IQuiz {
  type: QuizType.MultipleChoice;
  options: (string | number | boolean)[];
  correctOptions: boolean[];
}

export interface IFreeResponseQuiz extends IQuiz {
  type: QuizType.FreeResponse;
}

export interface IPythonCodingQuiz extends ICodingQuiz {
  type: QuizType.CodingPython;
}
