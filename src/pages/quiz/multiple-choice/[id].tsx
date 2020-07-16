import {
  getAllMultipleChoiceQuizzes,
  getMultipleChoiceQuiz,
  IMultipleChoiceQuiz,
} from 'lib/quizzes';
import MultipleChoiceQuiz from 'src/components/multiple-choice-quiz';
import Layout from 'src/components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function QuizPage({ quiz }: { quiz: IMultipleChoiceQuiz }) {
  return (
    <Layout>
      <div>Quiz ID: {quiz.id}</div>

      <MultipleChoiceQuiz quiz={quiz} />
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
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const quiz = await getMultipleChoiceQuiz(params.id as string);

  return {
    props: {
      quiz,
    },
  };
};
