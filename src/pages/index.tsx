import Layout from 'src/components/layout';
import Counter from 'src/components/counter';
import TodosComponent from 'src/components/todo';

export default function Home(props) {
  return (
    <Layout>
      <div className="test">
        <Counter />
        <TodosComponent />
      </div>
    </Layout>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      // For debugging purposes
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY.slice(0, 2), // Only log the first 5 letters
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    },
  };
};
