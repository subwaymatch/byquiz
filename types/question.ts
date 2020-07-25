export enum QuestionType {
  MultipleChoice = 'multiple-choice',
  FreeResponse = 'free-response',
  CodingPython = 'coding-python',
  CodingSQL = 'coding-sql',
}

export interface IQuestion {
  type: QuestionType;
  id: string;
  text: string;
  hint?: string;
  explanation: string;
}

export interface ICodingQuestion extends IQuestion {
  type: QuestionType;
  runBefore: string;
  beginningCode: string;
  runAfter: string;
  checkCode: string;
}

export interface IMultipleChoiceQuestion extends IQuestion {
  type: QuestionType.MultipleChoice;
  options: (string | number | boolean)[];
  correctOptions: boolean[];
}

export interface IFreeResponseQuestion extends IQuestion {
  type: QuestionType.FreeResponse;
}

export interface IPythonCodingQuiz extends ICodingQuestion {
  type: QuestionType.CodingPython;
}
