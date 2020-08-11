import Layout from 'src/components/layout/layout';
import styles from './home.module.scss';

export default function Home() {
  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <p className={styles.heroText}>Learn anything by solving problems.</p>

          <div className={styles.heroImageWrapper}>
            <img
              src="/images/3d-colourful-layered-geometric-shapes-for-landing-pages-001@2x.png"
              alt="3d Colorful Geometric Shapes for Landing Pages"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
