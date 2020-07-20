import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from 'src/components/layout';
import {
  getAllCourses,
  getCourseData,
  getCourseModulePageData,
} from 'lib/courses';
import { ICourse, ICourseModulePageData } from 'types/course';
import CourseHeader from 'src/components/course/course-header';
import CourseSidebar from 'src/components/course/course-sidebar';
import QuizComponent from 'src/components/quiz';

type CourseModulePagePageProps = {
  course: ICourse;
  pageData: ICourseModulePageData;
};

export default function CourseModulePagePage({
  course,
  pageData,
}: CourseModulePagePageProps) {
  console.log(course);
  console.log(pageData);

  return (
    <Layout>
      <div className="courseModulePageWrapper">
        <div className="row">
          <div className="col-12">
            <CourseHeader course={course} />
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <CourseSidebar course={course} />
          </div>

          <div className="col-9">
            <h3>{pageData.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: pageData.content }} />

            {pageData.quizzes.map((quiz) => (
              <QuizComponent key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </div>
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
