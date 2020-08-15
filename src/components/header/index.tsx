import Link from 'next/link';
import styles from './header.module.scss';
import { motion } from 'framer-motion';
import { FaPython } from 'react-icons/fa';
import { BsFillLayersFill } from 'react-icons/bs';
import { IoIosFiling } from 'react-icons/io';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

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
            <Link href="/course">
              <motion.a
                className={cx('menuItem', {
                  active:
                    router.pathname === '/course' ||
                    router.pathname.startsWith('/course/'),
                })}
                whileHover={{
                  y: 2,
                  transition: {
                    duration: 0.1,
                  },
                }}
              >
                <BsFillLayersFill className={cx('menuIcon')} />
                <span>Courses</span>
              </motion.a>
            </Link>
            <Link href="/question">
              <a
                className={cx('menuItem', {
                  active:
                    router.pathname === '/question' ||
                    router.pathname.startsWith('/question/'),
                })}
              >
                <IoIosFiling className={cx('menuIcon')} />
                <span>Challenges</span>
              </a>
            </Link>
            <Link href="/pyodide-test">
              <a className={cx('menuItem')}>
                <FaPython className={cx('menuIcon')} />
                <span>Playground</span>
              </a>
            </Link>
          </nav>
        )}
      </div>

      <div className={styles.headerRight}>&nbsp;</div>
    </header>
  );
}
