import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const quizContentPath = path.join(process.cwd(), 'content', 'quiz');
const multipleChoicePath = path.join(quizContentPath, 'multiple-choice');

export async function getMultipleChoiceQuizData(quizId) {
  const quizFile = fs.readFileSync(
    path.join(multipleChoicePath, `${quizId}.yaml`),
    {
      encoding: 'utf-8',
    }
  );

  const quizData = YAML.parse(quizFile);

  // Extract correct answers
  quizData['correctOptions'] = quizData['options'].map((option) => {
    return option.toString().endsWith('[o]') ? true : false;
  });

  return quizData;
}

export async function getAllMultipleChoiceQuizzes() {
  const fileNames = fs.readdirSync(multipleChoicePath);

  const quizzes = fileNames.map((fileName) => ({
    id: fileName.replace(/\.yaml$/, ''),
  }));

  return quizzes;
}
