import Link from 'next/link';
import styles from './header.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type HeaderComponentProps = {
  headerTitle?: string;
};

export default function HeaderComponent({ headerTitle }: HeaderComponentProps) {
  const router = useRouter();

  console.log(router.pathname);

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
            <Link href="/pyodide-test">
              <a className={cx('menuItem')}>Python Q</a>
            </Link>
            <Link href="/course">
              <a
                className={cx('menuItem', {
                  active:
                    router.pathname === '/course' ||
                    router.pathname.startsWith('/course/'),
                })}
              >
                Courses
              </a>
            </Link>
            <Link href="/question">
              <a
                className={cx('menuItem', {
                  active:
                    router.pathname === '/question' ||
                    router.pathname.startsWith('/question/'),
                })}
              >
                Questions
              </a>
            </Link>
          </nav>
        )}
      </div>

      <div className={styles.headerRight}>M</div>
    </header>
  );
}
