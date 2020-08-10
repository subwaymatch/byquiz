import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './course-module-navigation.module.scss';
import { ICourseModulePageMeta } from 'typing/course';

const cx = classNames.bind(styles);

type CourseModuleNavigationProps = {
  courseId: string;
  moduleId: string;
  pagesMeta: ICourseModulePageMeta[];
  currentPageId: string;
};

export default function CourseModuleNavigation({
  courseId,
  moduleId,
  pagesMeta,
  currentPageId,
}: CourseModuleNavigationProps) {
  return (
    <div className={styles.courseModuleNavigationWrapper}>
      <nav className={styles.courseModuleNavigation}>
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
