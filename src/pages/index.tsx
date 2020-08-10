import Layout from 'src/components/layout';
import styles from './home.module.scss';

export default function Home() {
  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <p className={styles.hero}>Learn anything by solving problems.</p>
        </div>
      </div>
    </Layout>
  );
}
