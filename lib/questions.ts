import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import YAML from 'yaml';
import {
  IMultipleChoiceQuestion,
  QuestionType,
  IPythonCodingQuestion,
} from 'typing/question';
import { readMarkdownFile, getFileContents } from './utils';

const questionContentPath = path.join(process.cwd(), 'content', 'question');
const multipleChoicePath = path.join(questionContentPath, 'multiple-choice');
const pythonCodingPath = path.join(questionContentPath, 'python-coding');

export async function getMultipleChoiceQuestion(
  questionId: string
): Promise<IMultipleChoiceQuestion> {
  const questionFile = await fsPromises.readFile(
    path.join(multipleChoicePath, `${questionId}.yaml`),
    {
      encoding: 'utf-8',
    }
  );

  const questionData: IMultipleChoiceQuestion = {
    id: questionId,
    type: QuestionType.MultipleChoice,
    ...YAML.parse(questionFile),
  };

  // Extract correct answers
  questionData['correctOptions'] = questionData['options'].map((option) => {
    return option.toString().endsWith('[o]') ? true : false;
  });

  return questionData;
}

export async function getAllMultipleChoiceQuestions(): Promise<
  IMultipleChoiceQuestion[]
> {
  const fileNames = fs.readdirSync(multipleChoicePath);
  const questionIds = fileNames.map((fileName) =>
    fileName.replace(/\.yaml$/, '')
  );
  const questions = Promise.all(
    questionIds.map(
      async (questionId) => await getMultipleChoiceQuestion(questionId)
    )
  );

  return questions;
}

export async function getPythonCodingQuestion(
  questionId: string
): Promise<IPythonCodingQuestion> {
  const questionDirPath = path.join(pythonCodingPath, questionId);

  const questionMarkdown = await readMarkdownFile(
    path.join(questionDirPath, '_question.md')
  );

  const templateCode = await getFileContents(
    path.join(questionDirPath, 'template.py')
  );
  const runBeforeCode = await getFileContents(
    path.join(questionDirPath, 'before.py')
  );
  const runAfterCode = await getFileContents(
    path.join(questionDirPath, 'after.py')
  );
  const checkCode = await getFileContents(
    path.join(questionDirPath, 'check.py')
  );
  const solutionCode = await getFileContents(
    path.join(questionDirPath, 'solution.py')
  );

  return {
    id: questionId,
    type: QuestionType.PythonCoding,
    title: questionMarkdown.title ? questionMarkdown.title : null,
    checkCode,
    solutionCode,
    text: questionMarkdown.content,
    explanation: questionMarkdown.explanation
      ? questionMarkdown.explanation
      : null,
    hint: questionMarkdown.hint ? questionMarkdown.hint : null,
    runBeforeCode,
    runAfterCode,
    templateCode,
    content: questionMarkdown,
  } as IPythonCodingQuestion;
}

// Full Id refers to "{question-type}/{question-id}"
// Question Id refers to only the {question-id} part
export async function getQuestionByFullId(
  fullId: string
): Promise<IMultipleChoiceQuestion | IPythonCodingQuestion> {
  const [questionType, questionId] = fullId.split('/');

  switch (questionType) {
    case QuestionType.MultipleChoice:
      return await getMultipleChoiceQuestion(questionId);
    case QuestionType.PythonCoding:
      return await getPythonCodingQuestion(questionId);
    default:
      return null;
  }
}
