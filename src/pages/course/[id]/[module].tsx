import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from 'src/components/layout';
import CourseModule from 'src/components/course/course-module';
import { ICourse, ICourseModule, ICourseModulePage } from 'types/course';
import {
  getAllCourses,
  getCourseData,
  getCourseModulePages,
  getCourseModuleData,
} from 'lib/courses';

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

export default function CourseModulePage(props) {
  console.log('CourseModulePage');
  console.log(props);

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
    fallback: true,
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

  console.log('getStaticProps');
  console.log(props);

  return {
    props,
  };
};
