import { GetStaticProps } from 'next';
import Layout from 'src/components/layout';
import PythonCodingQuestion from 'src/components/question/python-coding';
import { QuestionType, IPythonCodingQuestion } from 'typing/question';
import { getQuestionByFullId } from 'lib/questions';

const templateCode = `some_list = []`;
const text = `Create a variable called <code>some_list</code> and set its value to a
          list containing the values <code>-4</code>, <code>'cat'</code>, and <code>8.7</code>.`;
const hint = `Place -4, 'cat', and 8 into the list.`;
const solutionCode = `some_list = [-4, 'cat', 8.7]`;
const checkCode = `from nose.tools import assert_equal
assert_equal(some_list, [-4, 'cat', 8.7])`;

const question: IPythonCodingQuestion = {
  id: 'python-coding/create-list',
  type: QuestionType.PythonCoding,
  text,
  hint,
  templateCode,
  solutionCode,
  checkCode,
};

export default function PyodideTest(props: any) {
  console.log(props);

  return (
    <Layout>
      <div>
        <PythonCodingQuestion question={question} />

        <PythonCodingQuestion question={question} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const question: IPythonCodingQuestion = (await getQuestionByFullId(
    'python-coding/hello-world'
  )) as IPythonCodingQuestion;

  return {
    props: {
      question,
    },
  };
};
