import Layout from 'src/components/layout';
import Counter from 'src/components/counter';

export default function Home() {
  return (
    <Layout>
      <div className="test">
        <h2>Home</h2>

        <Counter />
      </div>
    </Layout>
  );
}
