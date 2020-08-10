import Link from 'next/link';
import { ICourse } from 'typing/course';
import styles from './course-sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type CourseSidebarProps = {
  course: ICourse;
  currentModuleId: string;
};

export default function CourseSidebar({
  course,
  currentModuleId,
}: CourseSidebarProps) {
  return (
    <div className={styles.sidebarWrapper}>
      <h1>{course.title}</h1>

      {course.modules.map((module) => (
        <Link
          key={module.id}
          href="/course/[courseId]/[moduleId]/[pageId]"
          as={`/course/${course.id}/${module.id}/${module.pages[0].id}`}
        >
          <div
            className={cx('moduleLinkItem', {
              active: module.id === currentModuleId,
            })}
          >
            {module.title}
          </div>
        </Link>
      ))}
    </div>
  );
}
