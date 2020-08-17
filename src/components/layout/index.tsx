import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderComponent from 'src/components/header';
import SlideMenu from 'src/components/burger-menu';
import styles from './layout.module.scss';

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const imageVariants = {
  exit: { y: '4%', opacity: 0, transition },
  enter: {
    y: '0%',
    opacity: 1,
    transition,
  },
};

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>ByQuiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="layout-wrapper" className={styles.layoutWrapper}>
        <SlideMenu />

        <div id="page-wrap" className={styles.pageWrapper}>
          <HeaderComponent />

          <main className={styles.main}>
            <div className="container">
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  variants={imageVariants}
                  initial="exit"
                  animate="enter"
                  exit="exit"
                >
                  <div className="row">{children}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
}
