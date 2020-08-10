import {
  getAllMultipleChoiceQuestions,
  getMultipleChoiceQuestion,
} from 'lib/questions';
import MultipleChoiceQuestion from 'src/components/question/multiple-choice';
import { IMultipleChoiceQuestion } from 'typing/question';
import Layout from 'src/components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';

type MultipleChoiceQuestionPageProps = {
  question: IMultipleChoiceQuestion;
};

export default function MultipleChoiceQuestionPage({
  question,
}: MultipleChoiceQuestionPageProps) {
  return (
    <Layout>
      <div>Question ID: {question.id}</div>

      <MultipleChoiceQuestion
        question={question}
        onCorrectSubmission={() => {
          // do nothing
        }}
        onIncorrectAttempt={() => {
          // do nothing
        }}
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const mcQuestions = await getAllMultipleChoiceQuestions();
  const paths = mcQuestions.map((question) => ({
    params: {
      id: question.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const question = await getMultipleChoiceQuestion(params.id as string);

  return {
    props: {
      question,
    },
  };
};
