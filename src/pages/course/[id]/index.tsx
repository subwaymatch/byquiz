import Link from 'next/link';
import { getCourseData, getAllCourses } from 'lib/courses';
import { ICourse } from 'types/course';
import Layout from 'src/components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';

type CoursePageProps = {
  course: ICourse;
};

export default function CoursePage({ course }: CoursePageProps) {
  const { id, title, description, modules } = course;

  return (
    <Layout>
      <h2>{title}</h2>
      <p>{description}</p>

      <h3>Modules</h3>
      {modules.map((cm) => (
        <div key={cm}>
          <Link href="/course/[id]/[cm]" as={`/course/${id}/${cm}`}>
            <a>{cm}</a>
          </Link>
        </div>
      ))}
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
  const course: ICourse = await getCourseData(params.id as string);

  return {
    props: { course },
  };
};
