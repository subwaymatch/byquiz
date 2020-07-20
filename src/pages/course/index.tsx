import { ICourse } from 'types/course';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getAllCourses } from 'lib/courses';
import Layout from 'src/components/layout';

type CourseIndexPageProps = {
  courses: ICourse[];
};

export default function CourseIndexPage({ courses }: CourseIndexPageProps) {
  console.log(courses);

  return (
    <Layout>
      <h2>All Courses</h2>

      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          {course.modules && (
            <ul>
              {course.modules.map((cm) => (
                <li key={cm.id}>{cm.id}</li>
              ))}
            </ul>
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
