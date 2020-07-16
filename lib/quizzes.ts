import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const quizContentPath = path.join(process.cwd(), 'content', 'quiz');
const multipleChoicePath = path.join(quizContentPath, 'multiple-choice');

export interface QuizBase {
  id: string;
  text: string;
  hint: string;
}

export interface MultipleChoiceQuiz extends QuizBase {
  options: (string | number | boolean)[];
  correctOptions: boolean[];
  explanation: string;
}

export interface CodingQuiz extends QuizBase {}

export async function getMultipleChoiceQuiz(
  quizId: string
): Promise<MultipleChoiceQuiz> {
  const quizFile = fs.readFileSync(
    path.join(multipleChoicePath, `${quizId}.yaml`),
    {
      encoding: 'utf-8',
    }
  );

  const quizData: MultipleChoiceQuiz = {
    id: quizId,
    ...YAML.parse(quizFile),
  };

  // Extract correct answers
  quizData['correctOptions'] = quizData['options'].map((option) => {
    return option.toString().endsWith('[o]') ? true : false;
  });

  return quizData;
}

export async function getAllMultipleChoiceQuizzes(): Promise<
  MultipleChoiceQuiz[]
> {
  const fileNames = fs.readdirSync(multipleChoicePath);
  const quizIds = fileNames.map((fileName) => fileName.replace(/\.yaml$/, ''));
  let quizzes = Promise.all(
    quizIds.map(async (quizId) => await getMultipleChoiceQuiz(quizId))
  );

  return quizzes;
}
