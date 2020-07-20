import {
  getAllMultipleChoiceQuizzes,
  getMultipleChoiceQuiz,
} from 'lib/quizzes';
import MultipleChoiceQuiz from 'src/components/quiz/multiple-choice-quiz';
import { IMultipleChoiceQuiz } from 'types/quiz';
import Layout from 'src/components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';

type MultipleChoiceQuizPageProps = {
  quiz: IMultipleChoiceQuiz;
};

export default function MultipleChoiceQuizPage({
  quiz,
}: MultipleChoiceQuizPageProps) {
  return (
    <Layout>
      <div>Quiz ID: {quiz.id}</div>

      <MultipleChoiceQuiz
        quiz={quiz}
        onCorrectSubmission={() => {
          console.log('Success!');
        }}
        onIncorrectAttempt={() => {
          console.log('Fail!');
        }}
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
