import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './course-module-pages-navigation.module.scss';
import { ICourseModulePageMeta } from 'typing/course';

const cx = classNames.bind(styles);

type CourseModulePageNavigationProps = {
  courseId: string;
  moduleId: string;
  pagesMeta: ICourseModulePageMeta[];
  currentPageId: string;
};

export default function CourseModulePagesNavigation({
  courseId,
  moduleId,
  pagesMeta,
  currentPageId,
}: CourseModulePageNavigationProps) {
  return (
    <div className={styles.navigationWrapper}>
      <nav className={styles.navigation}>
        {pagesMeta.map((pageMeta, pageIndex) => (
          <Link
            key={pageMeta.id}
            href="/course/[courseId]/[moduleId]/[pageId]"
            as={`/course/${courseId}/${moduleId}/${pageMeta.id}`}
          >
            <div
              className={cx('pageLinkItem', {
                active: pageMeta.id === currentPageId,
              })}
            >
              <span>{pageIndex + 1}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
