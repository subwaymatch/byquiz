import Link from 'next/link';
import styles from './header.module.scss';
import { motion } from 'framer-motion';
import { BsFillLayersFill } from 'react-icons/bs';
import { IoIosFiling } from 'react-icons/io';
import { FaPython } from 'react-icons/fa';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import MenuItem from './header-menu-item';

const cx = classNames.bind(styles);

type HeaderComponentProps = {
  headerTitle?: string;
};

export default function HeaderComponent({ headerTitle }: HeaderComponentProps) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link href="/">
          <a className={styles.siteTitle}>ByQuiz</a>
        </Link>
      </div>

      <div className={styles.headerCenter}>
        {headerTitle ? (
          <h1>{headerTitle}</h1>
        ) : (
          <nav className={styles.headerMainMenu}>
            <MenuItem
              href="/course"
              active={
                router.pathname === '/course' ||
                router.pathname.startsWith('/course/')
              }
              iconChild={<BsFillLayersFill />}
              text="Courses"
            />

            <MenuItem
              href="/question"
              active={
                router.pathname === '/question' ||
                router.pathname.startsWith('/question/')
              }
              iconChild={<IoIosFiling />}
              text="Challenges"
            />

            <MenuItem
              href="/pyodide-test"
              active={router.pathname.startsWith('/playground')}
              iconChild={<FaPython />}
              text="Playground"
            />
          </nav>
        )}
      </div>

      <div className={styles.headerRight}>&nbsp;</div>
    </header>
  );
}
