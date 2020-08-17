import { ICourse } from 'typing/course';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import classNames from 'classnames/bind';
import { getAllCourses } from 'lib/courses';
import Layout from 'src/components/layout';
import styles from './course.module.scss';

const cx = classNames.bind(styles);

type CourseIndexPageProps = {
  courses: ICourse[];
};

export default function CourseIndexPage({ courses }: CourseIndexPageProps) {
  return (
    <Layout>
      <div className={cx('courseIndexWrapper')}>
        <h1 className={cx('pageTitle')}>All Courses</h1>

        <div>
          {courses.map((course) => (
            <div key={course.id} className={cx('courseItem')}>
              <div className="frame">
                <div className={cx('courseInfo')}>
                  <h2 className={cx('courseTitle')}>{course.title}</h2>
                  <p>{course.description}</p>
                </div>

                {course.modules && (
                  <div>
                    {course.modules.map((cm) => {
                      return (
                        <Link
                          key={cm.id}
                          href="/course/[course]/[module]/[page]"
                          as={`/course/${course.id}/${cm.id}/${cm.pages[0].id}`}
                        >
                          <a className={styles.moduleItem}>{cm.title}</a>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const courses: ICourse[] = await getAllCourses();

  return {
    props: {
      courses,
    },
  };
};
