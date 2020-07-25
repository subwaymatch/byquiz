import Layout from 'src/components/layout';
import Counter from 'src/components/counter';
import TodosComponent from 'src/components/todo';

export default function Home() {
  return (
    <Layout>
      <div className="test">
        <Counter />
        <TodosComponent />
      </div>
    </Layout>
  );
}
