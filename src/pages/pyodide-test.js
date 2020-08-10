import Layout from 'src/components/layout';
import PythonCodingQuestion from 'src/components/question/python-coding';
import PythonCodingQuestionOld from 'src/components/question/python-coding-ace';

const templateCode = `some_list = []`;
const checkCode = `from nose.tools import assert_equal
assert_equal(some_list, [-4, 'cat', 8.7])`;

export default function PyodideTest() {
  return (
    <Layout>
      <div>
        <h3>Challenge</h3>
        <p>
          Create a variable called <code>some_list</code> and set its value to a
          list containing the values <code>-4</code>, <code>'cat'</code>, and{' '}
          <code>8.7</code>.
        </p>

        <PythonCodingQuestion />

        <PythonCodingQuestionOld
          templateCode={templateCode}
          checkCode={checkCode}
        />
      </div>
    </Layout>
  );
}
