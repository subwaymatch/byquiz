import { IQuiz } from 'types/quiz';
import classNames from 'classnames/bind';
import styles from './course-module-page-quizzes.module.scss';
import QuizComponent from 'src/components/quiz';

const cx = classNames.bind(styles);

type CourseModulePageQuizzesProps = {
  quizzes: IQuiz[];
};

export default function CourseModulePageQuizzes({
  quizzes,
}: CourseModulePageQuizzesProps) {
  return (
    <div className={styles.wrapper}>
      {quizzes.map((quiz) => (
        <QuizComponent key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}
