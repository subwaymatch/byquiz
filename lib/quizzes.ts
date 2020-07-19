import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { IQuiz, IMultipleChoiceQuiz, QuizType } from 'types/quiz';

const fsPromises = fs.promises;
const quizContentPath = path.join(process.cwd(), 'content', 'quiz');
const multipleChoicePath = path.join(quizContentPath, 'multiple-choice');

export async function getMultipleChoiceQuiz(
  quizId: string
): Promise<IMultipleChoiceQuiz> {
  const quizFile = await fsPromises.readFile(
    path.join(multipleChoicePath, `${quizId}.yaml`),
    {
      encoding: 'utf-8',
    }
  );

  const quizData: IMultipleChoiceQuiz = {
    id: quizId,
    type: QuizType.MultipleChoice,
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

// Full Id refers to "{quiz-type}/{quiz-id}"
// Quiz Id refers to only the {quiz-id} part
export async function getQuizByFullId(fullId: string): Promise<IQuiz> {
  const [quizType, quizId] = fullId.split('/');

  switch (quizType) {
    case QuizType.MultipleChoice:
      return await getMultipleChoiceQuiz(quizId);
    default:
      return null;
  }
}
