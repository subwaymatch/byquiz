import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from 'src/components/layout';
import CourseModule from 'src/components/course/course-module';
import { ICourse, ICourseModule, ICourseModulePage } from 'types/course';
import { getAllCourses } from 'lib/courses';

type CourseModulePageProps = {
  course: ICourse;
  courseModule: ICourseModule;
  modulePages: ICourseModulePage[];
};

// export default function CourseModulePage({
//   course,
//   courseModule,
//   modulePages,
// }: CourseModulePageProps) {
//   return (
//     <Layout>
//       <h2>{course.title}</h2>

//       <CourseModule />
//     </Layout>
//   );
// }

export default function CourseModulePage() {
  return (
    <Layout>
      <h2>CourseModulePage</h2>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await getAllCourses();

  return {
    paths: [
      {
        params: {
          id: 'intro-to-byquiz',
          module: 'first-module',
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
