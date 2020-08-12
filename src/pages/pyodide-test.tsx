import Layout from 'src/components/layout';
import PythonCodingQuestion from 'src/components/question/python-coding';
import { QuestionType, ICodingQuestion } from 'typing/question';

const templateCode = `some_list = []`;
const text = `Create a variable called <code>some_list</code> and set its value to a
          list containing the values <code>-4</code>, <code>'cat'</code>, and <code>8.7</code>.`;
const solutionCode = `some_list = [-4, 'cat', 8.7]`;
const checkCode = `from nose.tools import assert_equal
assert_equal(some_list, [-4, 'cat', 8.7])`;

const question: ICodingQuestion = {
  id: 'python-coding/create-list',
  type: QuestionType.PythonCoding,
  text,
  templateCode,
  solutionCode,
  checkCode,
  explanation: 'Test',
};

export default function PyodideTest() {
  return (
    <Layout>
      <div>
        <PythonCodingQuestion question={question} />
      </div>
    </Layout>
  );
}
