import { getCourseData, getAllCourses } from 'lib/courses';
import Layout from 'src/components/layout';

export default function CoursePage({ course }) {
  return (
    <Layout>
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <ul>
        {course.modules.map((cm) => (
          <li key={cm}>{cm}</li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticPaths() {
  const courses = await getAllCourses();

  const paths = courses.map((course) => ({
    params: {
      id: course.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const course = await getCourseData(params.id);

  return {
    props: { course },
  };
}
