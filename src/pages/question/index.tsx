import Link from 'next/link';
import { GetStaticProps } from 'next';
import Layout from 'src/components/layout';
import { getAllMultipleChoiceQuestions } from 'lib/questions';
import { IMultipleChoiceQuestion } from 'typing/question';

import styles from './index.module.scss';
import { motion } from 'framer-motion';

type QuestionHomeProps = {
  mcQuestions: IMultipleChoiceQuestion[];
};

const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition,
  },
};

export default function QuestionHome({ mcQuestions }: QuestionHomeProps) {
  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={thumbnailVariants}
      >
        <h1>List of Multiple Choice Questions</h1>

        <motion.div
          variants={{ exit: { transition: { staggerChildren: 0.2 } } }}
        >
          {mcQuestions.map((mcQuestion) => (
            <Link
              key={mcQuestion.id}
              href="/question/multiple-choice/[id]"
              as={`/question/multiple-choice/${mcQuestion.id}`}
            >
              <motion.a className={styles['questionLink']}>
                {mcQuestion.id}
              </motion.a>
            </Link>
          ))}
        </motion.div>
      </motion.div>
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
