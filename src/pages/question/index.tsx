import Link from 'next/link';
import { GetStaticProps } from 'next';
import Layout from 'src/components/layout';
import { getAllMultipleChoiceQuestions } from 'lib/questions';
import { IMultipleChoiceQuestion } from 'typing/question';

import styles from './index.module.scss';

type QuestionHomeProps = {
  mcQuestions: IMultipleChoiceQuestion[];
};

export default function QuestionHome({ mcQuestions }: QuestionHomeProps) {
  return (
    <Layout>
      <h2>List of Multiple Choice Questions</h2>

      {mcQuestions.map((mcQuestion) => (
        <Link
          key={mcQuestion.id}
          href="/question/multiple-choice/[id]"
          as={`/question/multiple-choice/${mcQuestion.id}`}
        >
          <a className={styles['questionLink']}>{mcQuestion.id}</a>
        </Link>
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const mcQuestions = await getAllMultipleChoiceQuestions();

  return {
    props: {
      mcQuestions,
    },
  };
};
