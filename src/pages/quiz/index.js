import Link from 'next/link';
import Layout from 'src/components/layout';
import { getAllMultipleChoiceQuizzes } from 'lib/quizzes';

import styles from './index.module.scss';

export default function QuizHome(props) {
  return (
    <Layout>
      <h2>List of Multiple Choice Quizzes</h2>

      {props.mcQuizzes.map((mcQuiz) => (
        <Link
          key={mcQuiz.id}
          href="/quiz/multiple-choice/[id]"
          as={`/quiz/multiple-choice/${mcQuiz.id}`}
        >
          <a className={styles['quiz-link']}>{mcQuiz.id}</a>
        </Link>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const mcQuizzes = await getAllMultipleChoiceQuizzes();

  return {
    props: {
      mcQuizzes,
    },
  };
}
