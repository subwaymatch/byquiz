import Layout from 'src/components/layout';
import PythonCodingQuestion from 'src/components/question/python-coding';

export default function PyodideTest() {
  return (
    <Layout>
      <div>
        <h1>Pyodide Test</h1>

        <PythonCodingQuestion />
      </div>
    </Layout>
  );
}
