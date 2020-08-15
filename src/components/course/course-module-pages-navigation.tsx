import Link from 'next/link';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
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
            <motion.div
              className={cx('pageLinkItem', {
                active: pageMeta.id === currentPageId,
              })}
              whileHover={{
                y: 2,
                transition: {
                  duration: 0.1,
                },
              }}
              whileTap={{
                scale: 0.9,
              }}
            >
              <span>{pageIndex + 1}</span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
