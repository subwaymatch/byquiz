import { GetStaticProps } from 'next';
import Layout from 'src/components/layout';
import PythonCodingQuestion from 'src/components/question/python-coding';
import { IPythonCodingQuestion } from 'typing/question';
import { getQuestionByFullId } from 'lib/questions';

export default function PyodideTest(props: any) {
  return (
    <Layout>
      <div>
        <PythonCodingQuestion question={props.question} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const question: IPythonCodingQuestion = (await getQuestionByFullId(
    'python-coding/print-hello-world'
  )) as IPythonCodingQuestion;

  return {
    props: {
      question,
    },
  };
};
