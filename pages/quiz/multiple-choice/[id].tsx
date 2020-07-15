import {
  getAllMultipleChoiceQuizzes,
  getMultipleChoiceQuizData,
} from 'lib/quizzes';
import MultipleChoiceQuestion from 'components/multiple-choice-question';
import Layout from 'components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function QuizPage(props) {
  const { id, text, hint, options, explanation } = props;

  return (
    <Layout>
      <div>Quiz ID: {id}</div>
      <MultipleChoiceQuestion
        id={id}
        text={text}
        hint={hint}
        options={options}
        explanation={explanation}
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const mcQuizzes = await getAllMultipleChoiceQuizzes();
  const paths = mcQuizzes.map((quiz) => ({
    params: {
      id: quiz.id,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const quizData = await getMultipleChoiceQuizData(params.id);

  return {
    props: {
      id: params.id,
      ...quizData,
    },
  };
};
