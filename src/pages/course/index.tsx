import { ICourse } from 'types/course';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getAllCourses } from 'lib/courses';
import Layout from 'src/components/layout';
import styles from './index.module.scss';

type CourseIndexPageProps = {
  courses: ICourse[];
};

export default function CourseIndexPage({ courses }: CourseIndexPageProps) {
  return (
    <Layout>
      <h2>All Courses</h2>

      {courses.map((course) => (
        <div key={course.id} className={styles.courseItem}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          {course.modules && (
            <div>
              {course.modules.map((cm) => (
                <Link
                  key={cm.id}
                  href="/course/[course]/[module]/[page]"
                  as={`/course/${course.id}/${cm.id}/${cm.pages[0].id}`}
                >
                  <div className={styles.courseModuleItem}>{cm.title}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
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
