import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const quizContentPath = path.join(process.cwd(), 'content', 'quiz');
const multipleChoicePath = path.join(quizContentPath, 'multiple-choice');

export type QuizData = {
  id: string;
  text: string;
  hint: string;
  options: (string | number | boolean)[];
  correctOptions: boolean[];
  explanation: string;
};

export async function getMultipleChoiceQuizData(
  quizId: string
): Promise<QuizData> {
  const quizFile = fs.readFileSync(
    path.join(multipleChoicePath, `${quizId}.yaml`),
    {
      encoding: 'utf-8',
    }
  );

  const quizData: QuizData = {
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
  Array<{ id: string }>
> {
  const fileNames = fs.readdirSync(multipleChoicePath);

  const quizzes = fileNames.map((fileName) => ({
    id: fileName.replace(/\.yaml$/, ''),
  }));

  return quizzes;
}
