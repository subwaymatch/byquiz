import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './course-module-page-bottom-navigation.module.scss';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const cx = classNames.bind(styles);

type PropTypes = {
  prevModuleLabel: string;
  prevPageLabel: string;
  prevHref: string | null;
  nextModuleLabel: string;
  nextPageLabel: string;
  nextHref: string | null;
};

export default function CourseModulePageBottomNavigation({
  prevModuleLabel,
  prevPageLabel,
  prevHref,
  nextModuleLabel,
  nextPageLabel,
  nextHref,
}: PropTypes) {
  return (
    <div className={styles.navigationWrapper}>
      <nav className={styles.navigation}>
        {prevHref ? (
          <Link href={prevHref}>
            <div className={cx('navItem', 'navPrev')}>
              <BsChevronLeft className={cx('navArrowIcon')} />
              <div className={cx('label')}>
                <span className={cx('moduleLabel')}>{prevModuleLabel}</span>
                <span className={cx('pageLabel')}>{prevPageLabel}</span>
              </div>
            </div>
          </Link>
        ) : null}

        <div className={cx('spacer')} />

        {nextHref && (
          <Link href={nextHref}>
            <div className={cx('navItem', 'navNext')}>
              <div className={cx('label')}>
                <span className={cx('moduleLabel')}>{nextModuleLabel}</span>
                <span className={cx('pageLabel')}>{nextPageLabel}</span>
              </div>
              <BsChevronRight className={cx('navArrowIcon')} />
            </div>
          </Link>
        )}
      </nav>
    </div>
  );
}
