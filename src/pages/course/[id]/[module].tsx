import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from 'src/components/layout';
import CourseModule from 'src/components/course/course-module';
import { ICourse, ICourseModule, ICourseModulePage } from 'types/course';
import {
  getAllCourses,
  getCourseData,
  getCourseModulePages,
  getCourseModuleData,
} from 'lib/courses';
import styles from './course.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type CourseModulePageProps = {
  course: ICourse;
  module: ICourseModule;
  pages: ICourseModulePage[];
};

export default function CourseModulePage({
  course,
  module,
  pages,
}: CourseModulePageProps) {
  console.log('CourseModulePage');

  return (
    <Layout>
      <div className={styles.courseModule}>
        <div className="row">
          <div className="col-12">
            <div className={styles.courseInfo}>
              <span>{course.title}</span>
              <h2>{module.title}</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            {course.modules.map((cm) => (
              <Link
                href="/course/[courseId]/[moduleId]"
                as={`/course/${course.id}/${cm}`}
              >
                <a
                  className={cx({
                    moduleLink: true,
                    isActive: cm === module.id,
                  })}
                >
                  {cm}
                </a>
              </Link>
            ))}
          </div>

          <div className="col-9">
            {pages.map((page) => (
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await getAllCourses();

  const paths = [];

  for (const course of courses) {
    for (const moduleId of course.modules) {
      paths.push({
        params: {
          id: course.id,
          module: moduleId,
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id, module } = params;

  const courseId = id as string;
  const moduleId = module as string;

  const courseData = await getCourseData(courseId);
  const moduleData = await getCourseModuleData(courseId, moduleId);
  const pagesData = await getCourseModulePages(courseId, moduleId);

  const props = {
    course: courseData,
    module: moduleData,
    pages: pagesData,
  };

  return {
    props,
  };
};
