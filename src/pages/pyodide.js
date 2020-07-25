import PyodideWrapper from '../components/pyodide-wrapper';
import Layout from '../components/Layout';

export default function PyodideTestPage() {
  return (
    <PyodideWrapper>
      <Layout>
        <div>
          <h1>PyodideTestPage Component</h1>
        </div>
      </Layout>
    </PyodideWrapper>
  );
}
