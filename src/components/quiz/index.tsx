import { IQuiz, QuizType, IMultipleChoiceQuiz } from 'types/quiz';
import MultipleChoiceQuiz from './multiple-choice-quiz';

type QuizComponentProps = {
  quiz: IQuiz;
};

export default function QuizComponent({ quiz }: QuizComponentProps) {
  switch (quiz.type) {
    case QuizType.MultipleChoice:
      return <MultipleChoiceQuiz quiz={quiz as IMultipleChoiceQuiz} />;
    default:
      return <div>Not implemented yet</div>;
  }
}
