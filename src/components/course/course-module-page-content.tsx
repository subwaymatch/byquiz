import { ICourseModulePageData } from 'typing/course';
import classNames from 'classnames/bind';
import styles from './course-module-page-content.module.scss';

const cx = classNames.bind(styles);

type CourseModulePageContentProps = {
  pageData: ICourseModulePageData;
};

export default function CourseModulePageContent({
  pageData,
}: CourseModulePageContentProps) {
  return (
    <div className={cx('courseModulePageContent')}>
      <h2>{pageData.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </div>
  );
}
