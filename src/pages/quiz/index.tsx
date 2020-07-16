import Link from 'next/link';
import { GetStaticProps } from 'next';
import Layout from 'src/components/layout';
import { getAllMultipleChoiceQuizzes, MultipleChoiceQuiz } from 'lib/quizzes';

import styles from './index.module.scss';

type QuizHomeProps = {
  mcQuizzes: MultipleChoiceQuiz[];
};

export default function QuizHome({ mcQuizzes }: QuizHomeProps) {
  console.log(mcQuizzes);

  return (
    <Layout>
      <h2>List of Multiple Choice Quizzes</h2>

      {mcQuizzes.map((mcQuiz) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const mcQuizzes = await getAllMultipleChoiceQuizzes();

  return {
    props: {
      mcQuizzes,
    },
  };
};
