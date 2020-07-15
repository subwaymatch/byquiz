import Link from 'next/link';
import Layout from 'components/layout';
import { getAllCourses } from 'lib/courses';
import styles from './index.module.scss';

export default function CourseHome({ courses }) {
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

export async function getStaticProps() {
  const courses = await getAllCourses();

  return {
    props: {
      courses,
    },
  };
}
