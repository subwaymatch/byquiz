import {
  IQuestion,
  QuestionType,
  IMultipleChoiceQuestion,
  IPythonCodingQuestion,
} from 'typing/question';
import MultipleChoiceQuestion from './multiple-choice';
import PythonCodingQuestion from './python-coding';

type QuestionComponentProps = {
  question: IQuestion;
};

export default function QuestionComponent({
  question,
}: QuestionComponentProps) {
  switch (question.type) {
    case QuestionType.MultipleChoice:
      return (
        <MultipleChoiceQuestion
          question={question as IMultipleChoiceQuestion}
        />
      );
    case QuestionType.PythonCoding:
      return (
        <PythonCodingQuestion question={question as IPythonCodingQuestion} />
      );
    default:
      return <div>Not implemented yet</div>;
  }
}
