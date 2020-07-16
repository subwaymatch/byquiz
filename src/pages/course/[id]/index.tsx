import { getCourseData, getAllCourses, ICourse } from 'lib/courses';
import Layout from 'src/components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';

type CoursePageProps = {
  course: ICourse;
};

export default function CoursePage({ course }: CoursePageProps) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const courses: ICourse[] = await getAllCourses();

  const paths = courses.map((course) => ({
    params: {
      id: course.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const course: ICourse = await getCourseData(params.id);

  return {
    props: { course },
  };
};
