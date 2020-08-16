import Layout from 'src/components/layout';
import styles from './home.module.scss';
import { motion } from 'framer-motion';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Home() {
  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
          >
            <p className={styles.heroText}>
              Learn anything by solving problems.
            </p>
          </motion.div>

          <ClipLoader
            css={override}
            size={150}
            color={'#123abc'}
            loading={true}
          />

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
