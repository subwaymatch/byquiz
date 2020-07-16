import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

import { IMultipleChoiceQuiz } from 'types/quiz';

const quizContentPath = path.join(process.cwd(), 'content', 'quiz');
const multipleChoicePath = path.join(quizContentPath, 'multiple-choice');

export async function getMultipleChoiceQuiz(
  quizId: string
): Promise<IMultipleChoiceQuiz> {
  const quizFile = fs.readFileSync(
    path.join(multipleChoicePath, `${quizId}.yaml`),
    {
      encoding: 'utf-8',
    }
  );

  const quizData: IMultipleChoiceQuiz = {
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
  IMultipleChoiceQuiz[]
> {
  const fileNames = fs.readdirSync(multipleChoicePath);
  const quizIds = fileNames.map((fileName) => fileName.replace(/\.yaml$/, ''));
  const quizzes = Promise.all(
    quizIds.map(async (quizId) => await getMultipleChoiceQuiz(quizId))
  );

  return quizzes;
}
