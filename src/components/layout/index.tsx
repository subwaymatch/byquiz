import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import HeaderComponent from 'src/components/header';
import SlideMenu from 'src/components/burger-menu';
import styles from './layout.module.scss';

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
              <div className="row">{children}</div>
            </div>
          </main>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
}
