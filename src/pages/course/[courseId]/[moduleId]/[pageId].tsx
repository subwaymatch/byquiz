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
            courseId: course.id,
            moduleId: module.id,
            pageId: page.id,
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
  const { courseId, moduleId, pageId } = params;

  const course = await getCourseData(courseId as string);
  const pageData = await getCourseModulePageData(
    courseId as string,
    moduleId as string,
    pageId as string
  );

  return {
    props: {
      course,
      pageData,
    },
  };
};
