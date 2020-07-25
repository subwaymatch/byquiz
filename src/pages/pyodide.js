import PyodideWrapper from 'src/components/pyodide-wrapper';
import Layout from 'src/components/Layout';

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
