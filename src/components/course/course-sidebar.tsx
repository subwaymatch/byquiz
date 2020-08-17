import Link from 'next/link';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { ICourse } from 'typing/course';
import styles from './course-sidebar.module.scss';
import { GoCheck } from 'react-icons/go';

const cx = classNames.bind(styles);

type CourseSidebarProps = {
  course: ICourse;
  currentModuleId: string;
};

export default function CourseSidebar({
  course,
  currentModuleId,
}: CourseSidebarProps) {
  const currentModuleIndex = _.findIndex(
    course.modules,
    (module) => module.id === currentModuleId
  );

  return (
    <div className={cx('sidebarWrapper')}>
      <span className={cx('sidebarTitle')}>{course.title}</span>

      <nav className={cx('sideNav')}>
        {course.modules.map((module, index) => {
          const isComplete = index < currentModuleIndex;
          const isInProgress = module.id === currentModuleId;
          const isIncomplete = index > currentModuleIndex;

          return (
            <Link
              key={module.id}
              href="/course/[courseId]/[moduleId]/[pageId]"
              as={`/course/${course.id}/${module.id}/${module.pages[0].id}`}
            >
              <div
                className={cx('moduleLinkItem', {
                  isComplete,
                  isInProgress,
                  isIncomplete,
                })}
              >
                <div className={cx('verticalLine')} />
                <div className={cx('indicator')}>
                  {isComplete ? (
                    <div className={cx('checkIconWrapper')}>
                      <GoCheck className={cx('checkIcon')} />
                    </div>
                  ) : isInProgress ? (
                    <div className={cx('currentCircle')} />
                  ) : (
                    <div className={cx('nan')} />
                  )}
                </div>
                <span className={cx('label')}>{module.title}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
