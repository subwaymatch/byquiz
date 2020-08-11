import Link from 'next/link';
import styles from './header.module.scss';

type HeaderComponentProps = {
  headerTitle?: string;
};

export default function HeaderComponent({ headerTitle }: HeaderComponentProps) {
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
              <a>Python Q</a>
            </Link>
            <Link href="/course">
              <a>Courses</a>
            </Link>
            <Link href="/question">
              <a>Questions</a>
            </Link>
          </nav>
        )}
      </div>

      <div className={styles.headerRight}>M</div>
    </header>
  );
}
