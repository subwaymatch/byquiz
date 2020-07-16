import Link from 'next/link';
import { GetStaticProps } from 'next';
import Layout from 'src/components/layout';
import { getAllCourses, ICourse } from 'lib/courses';
import styles from './index.module.scss';

type CourseHomeTypes = {
  courses: ICourse[];
};

export default function CourseHome({ courses }: CourseHomeTypes) {
  return (
    <Layout>
      <h2>Courses</h2>

      {courses.map((course) => (
        <Link key={course.id} href="/course/[id]" as={`/course/${course.id}`}>
          <a className={styles['course-item']} key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </a>
        </Link>
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
