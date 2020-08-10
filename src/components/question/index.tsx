import {
  IQuestion,
  QuestionType,
  IMultipleChoiceQuestion,
} from 'typing/question';
import MultipleChoiceQuestion from './multiple-choice';

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
    default:
      return <div>Not implemented yet</div>;
  }
}
