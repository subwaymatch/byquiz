export enum QuestionType {
  MultipleChoice = 'multiple-choice',
  FreeResponse = 'free-response',
  PythonCoding = 'python-coding',
  SQLCoding = 'sql-coding',
}

export interface IQuestion {
  type: QuestionType;
  id: string;
  text: string;
  hint?: string;
  explanation?: string;
}

export interface IMultipleChoiceQuestion extends IQuestion {
  type: QuestionType.MultipleChoice;
  options: (string | number | boolean)[];
  correctOptions: boolean[];
}

export interface IFreeResponseQuestion extends IQuestion {
  type: QuestionType.FreeResponse;
}

export interface IPythonCodingQuestion extends IQuestion {
  type: QuestionType.PythonCoding;
  templateCode?: string;
  solutionCode: string;
  checkCode: string;
  runBefore?: string;
  runAfter?: string;
}
