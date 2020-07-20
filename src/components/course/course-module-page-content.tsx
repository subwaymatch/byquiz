import { ICourseModulePageData } from 'types/course';
import classNames from 'classnames/bind';
import styles from './course-module-page-content.module.scss';
import QuizComponent from 'src/components/quiz';

const cx = classNames.bind(styles);

type CourseModulePageContentProps = {
  pageData: ICourseModulePageData;
};

export default function CourseModulePageContent({
  pageData,
}: CourseModulePageContentProps) {
  return (
    <div className={styles.courseModulePageContent}>
      <h3>{pageData.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </div>
  );
}
