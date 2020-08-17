import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getAllCourses,
  getCourseData,
  getCourseModulePageData,
} from 'lib/courses';
import CourseModulePageComponent from 'src/components/course/course-module-page';
import Layout from 'src/components/layout';

export default function CourseModulePage({ course, pageData }) {
  return (
    <Layout>
      <CourseModulePageComponent course={course} pageData={pageData} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await getAllCourses();

  const paths = [];

  courses.forEach((course) => {
    course.modules.forEach((module) => {
      module.pages.forEach((page) => {
        paths.push({
          params: {
            id: course.id,
            module: module.id,
            page: page.id,
          },
        });
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id, module, page } = params;

  const courseId = id as string;
  const moduleId = module as string;
  const pageId = page as string;

  const course = await getCourseData(courseId);
  const pageData = await getCourseModulePageData(courseId, moduleId, pageId);

  return {
    props: {
      course,
      pageData,
    },
  };
};
